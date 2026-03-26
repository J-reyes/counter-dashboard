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

## Steps 3–4: Component Breakdown and UI Skeleton

**Concept:** Build a static version before adding interactivity.

The hierarchy has three distinct views controlled by two pieces of state in `App` (`selectedCategoryId`, `selectedCounterId`). Components were built leaf-first (cards and rows before lists and detail views) because containers depend on their children being ready.

**Why so many components?** Each component does one thing. Splitting lists from cards means changing how a card looks never touches the list logic, and vice versa.

**Key insight:** `App` IS the dashboard — the app title is just a `<h1>` in `App`, not a separate component. A dedicated `Dashboard` component would have been redundant since `App` already owns the layout and view switching.
