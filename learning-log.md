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

## Steps 3–4: Component Breakdown and UI Skeleton

**Concept:** Build a static version before adding interactivity.

The hierarchy has three distinct views controlled by two pieces of state in `App` (`selectedCategoryId`, `selectedCounterId`). Components were built leaf-first (cards and rows before lists and detail views) because containers depend on their children being ready.

**Why so many components?** Each component does one thing. Splitting lists from cards means changing how a card looks never touches the list logic, and vice versa.

**Key insight:** `App` IS the dashboard — the app title is just a `<h1>` in `App`, not a separate component. A dedicated `Dashboard` component would have been redundant since `App` already owns the layout and view switching.
