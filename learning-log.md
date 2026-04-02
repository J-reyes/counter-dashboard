# Counter Dashboard — Learning Log

---

## Steps 0–1: Setup and Data Model

**Concept:** Discriminated unions for state that has multiple shapes.

Instead of one type with optional fields (`count?: number`, `segments?: Segment[]`), we use a `mode` field as a discriminant. When TypeScript sees `counter.mode === "simple"`, it narrows the type and knows `count` exists — accessing the wrong field for a given mode is a compile-time error, not a runtime surprise.

**Why it matters:** Optional fields force null checks everywhere and allow invalid states (e.g. a "simple" counter with no `count`). The discriminated union makes invalid states unrepresentable.

```ts
type Counter = SimpleCounter | SegmentedCounter;
// After checking counter.mode === "simple", TypeScript knows counter.count exists.
```

`BaseCounter` is intentionally unexported — it's an implementation detail used only to share fields between the two counter types.

---

## Step 2: State Ownership

**Concept:** Store an `id`, look up the object — never duplicate state.

Each `Counter` stores a `categoryId` (a reference), not a full `Category` object. This means renaming a category requires updating it in exactly one place. If the full object were stored on each counter, a rename would require updating every counter — and a missed update would cause inconsistent data.

**Key rule:** If a value can be derived from existing state, compute it during render. Never store totals, filtered lists, or computed counts in state.

---

## Step 5: Add a Category (Controlled Inputs + Callbacks)

**Concept:** Local state for form inputs, callback props for communicating up.

The `AddCategoryForm` owns its own `name` state because no other component needs to know what the user is currently typing — only the final submitted value matters to `App`. When the form submits, it builds a complete `Category` object and passes it up via `onAddCategory`. `App` appends it to the `categories` array immutably using the functional `prev =>` form of `setCategories`.

**Key rule:** Keep UI-only state local. Lift only what other components actually need.

```ts
onAddCategory: (category: Category) => void  // Props type — receives a complete object, not raw fields
```

---

## Step 6: View Navigation (State-Driven Routing)

**Concept:** Three views controlled by two pieces of state, no router needed.

`selectedCategoryId` and `selectedCounterId` in `App` determine which view renders. The combination of their values maps to exactly one view:

| `selectedCategoryId` | `selectedCounterId` | View |
|---|---|---|
| `null` | `null` | Category List |
| set | `null` | Category Detail |
| set | set | Counter Detail |

Going back to the category list clears both. Going back to category detail clears only `selectedCounterId` — `selectedCategoryId` must stay set so the right category detail renders.

Callbacks flow down through props: `App` defines all handlers, passes them to view components, which wire them to buttons.

---

## Step 7: Add a Counter (Discriminated Union Builds + Prop Drilling)

**Concept:** Building a discriminated union explicitly — no spreads, no casts.

When creating a new counter, the shape depends on `form.mode`. You must build each branch fully and explicitly so TypeScript can verify the correct fields are present:

```ts
const newCounter: Counter = form.mode === "simple"
  ? { id: ..., mode: "simple", count: 0, ... }   // TypeScript knows count exists here
  : { id: ..., mode: "segmented", segments: [], ... }  // TypeScript knows segments exists here
```

Using `{ ...form, mode: "simple", count: 0 }` looks shorter but TypeScript can't verify the full shape — it sees an ambiguous `mode` from the spread. The explicit ternary is the safe pattern for discriminated unions.

**Prop drilling chain for `onSelectCounter`:**
```
App → CategoryDetail → CounterList → CounterSummaryCard → Open button
```
Each component in the chain receives the callback as a prop and passes it down. When a callback needs to travel through multiple components, map the full chain before writing any of it.

**Deriving data instead of storing it:** The category name shown in `CategoryDetail` is looked up in `App` during render (`categories.find(...)`) and passed down as a plain string — not stored in state. This keeps `App` as the single source of truth.

---

## Steps 9–12: Counter Controls and Segment Management

**Concept:** Nested immutable updates — two levels of `map` for segmented counters.

To update a segment inside a counter, you need two nested maps:
1. Outer `map` finds the right counter by `counterId` and mode check
2. Inner `map` finds the right segment by `segmentId` and returns a new object with updated count

To delete a segment, the inner operation switches from `map` to `filter` — same outer map, but `filter` removes the matching segment instead of updating it.

**Pre-binding callbacks in `SegmentedCounterControls`** keeps `SegmentRow` simple — it only needs `onIncrement: () => void` with no ids. The parent binds `counter.id` and `segment.id` at render time:
```tsx
onIncrement={() => onIncrementSegment(counter.id, segment.id)}
```

**The `step` field was removed** — all counters now increment/decrement by 1. `step` added complexity without matching the actual use case: count up to your target, then "lock in" a set by adding a new segment.

**String vs number input bug:** `<input type="number">` always returns a string value. When stored in state without conversion, `count + step` does string concatenation (`"011"`) not addition. Fix: explicitly convert the field to a number when updating state.

---

## Steps 3–4: Component Breakdown and UI Skeleton

**Concept:** Build a static version before adding interactivity.

The hierarchy has three distinct views controlled by two pieces of state in `App` (`selectedCategoryId`, `selectedCounterId`). Components were built leaf-first (cards and rows before lists and detail views) because containers depend on their children being ready.

**Why so many components?** Each component does one thing. Splitting lists from cards means changing how a card looks never touches the list logic, and vice versa.

**Key insight:** `App` IS the dashboard — the app title is just a `<h1>` in `App`, not a separate component. A dedicated `Dashboard` component would have been redundant since `App` already owns the layout and view switching.

---

## Bug Fix: SegmentRow Display

**Concept:** JSX adjacent inline elements have no automatic spacing — and element order is UI logic.

Two bugs lived in a single component (`SegmentRow`), both caused by the same layout decision.

**Bug 1 — "starts at 10":**
```tsx
// Before (broken)
<span>Set {index + 1}</span>
<span>{segment.count}</span>
```
Adjacent `<span>` elements in JSX render touching. "Set 1" + "0" = "Set 10". The count was always 0 — the display was lying.

**Bug 2 — "increment/decrement appear swapped":**
With both buttons placed *after* the count and no value between them, the layout broke the mental model established by `SimpleCounterControls` (`[-][count][+]`). "Decrement -" appeared first, making it feel reversed.

**Fix — one layout change solved both:**
```tsx
// After (fixed)
<span>Set {index + 1}</span>
<button onClick={onDecrementSegment}>Decrement -</button>
<span>{segment.count}</span>
<button onClick={onIncrementSegment}>Increment +</button>
```
Moving `{segment.count}` between the buttons separates it from the label AND restores the expected `[-][count][+]` order. The state logic was never wrong — only the layout was.

---

## Feature: Decrement Floor (no negatives)

**Concept:** Guard a state update with a condition rather than clamping after the fact.

The cleanest way to prevent a count from going below zero is to extend the condition that already decides whether to update — not to compute the new value and then clamp it.

```tsx
// Instead of: count: Math.max(0, c.count - 1)
// Do this:
c.id === counterId && c.mode === "simple" && c.count > 0
  ? { ...c, count: c.count - 1 }
  : c
```

The `c.count > 0` check is added directly to the condition. When count is already 0, the whole branch is skipped and `c` is returned unchanged — no unnecessary re-render, no clamping math. The rule reads like plain English: *only decrement if there's room to go down*.

The same guard was added to the inner segment condition in `handleDecrementSegment`: `s.count > 0`.
