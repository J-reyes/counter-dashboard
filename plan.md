# Counter Dashboard — Step-by-step Plan

Goal: Build a React app that organizes named counters into categories (e.g. Gym, Beverages). Each category can hold multiple counters. Counters come in two modes: simple (a single running count, good for tracking drinks) and segmented (multiple sets, good for tracking workout sets like 3 sets of 10 pushups). Focus: CRUD on arrays of objects, nested immutable updates, discriminated unions, view navigation using state, and deriving values from nested data.

---

## 0) Setup

- Create a new Vite + React + TypeScript project inside `counter-dashboard/`.
- Keep styling minimal. Use plain CSS in `index.css` — focus stays on React patterns.

Deliverable: App runs and renders a simple heading.

---

## 1) Define the data model

### Segment type

A segment represents one set within a segmented counter:

```ts
export type Segment = {
  readonly id: string;
  count: number;
};
```

### Category type

A category groups related counters together:

```ts
export type Category = {
  readonly id: string;
  name: string;
  readonly createdAt: string;
};
```

### Counter type — discriminated union

A counter belongs to a category and can be either simple or segmented. The `mode` field is the discriminant — TypeScript uses it to know which fields are available.

```ts
type BaseCounter = {
  readonly id: string;
  label: string;
  step: number;
  readonly createdAt: string;
  readonly categoryId: string;
};

export type SimpleCounter = BaseCounter & {
  mode: "simple";
  count: number;
};

export type SegmentedCounter = BaseCounter & {
  mode: "segmented";
  segments: Segment[];
};

export type Counter = SimpleCounter | SegmentedCounter;
```

> `categoryId` stores a reference to the category — not the full category object. Looking up the category by id keeps the data flat and avoids duplicating category data on every counter.

> `createdAt` is set once at creation using `new Date().toISOString()` and never changes, so it is marked `readonly`.

> `mode` is chosen at creation and never changes.

Deliverable: `types.ts` exports `Segment`, `Category`, `SimpleCounter`, `SegmentedCounter`, and `Counter`.

---

## 2) Decide the state ownership

### What lives in App
- `categories: Category[]` — all categories
- `counters: Counter[]` — all counters across all categories
- `selectedCategoryId: string | null` — which category is being viewed. `null` means the category list is shown.
- `selectedCounterId: string | null` — which counter is being viewed. `null` means the category detail is shown.

### View navigation using state

Three views are controlled by two pieces of state:

| `selectedCategoryId` | `selectedCounterId` | View shown         |
|----------------------|---------------------|--------------------|
| `null`               | `null`              | Category List      |
| set                  | `null`              | Category Detail    |
| set                  | set                 | Counter Detail     |

```tsx
// In App's render
{selectedCategoryId === null ? (
  <CategoryList ... />
) : selectedCounterId === null ? (
  <CategoryDetail ... />
) : (
  <CounterDetail ... />
)}
```

> This is the right approach when views are contextual and don't need bookmarkable URLs. If the app grew to need shareable links or browser back-button support, React Router would be the next step.

### What NOT to store (derive it instead)

Counters for the selected category:
```ts
const categoryCounters = counters.filter(c => c.categoryId === selectedCategoryId);
```

The selected counter:
```ts
const selectedCounter = counters.find(c => c.id === selectedCounterId);
```

Total for a single counter:
```ts
// Simple
counter.count

// Segmented
counter.segments.reduce((sum, s) => sum + s.count, 0)
```

### State checklist before adding any new `useState`
1. Does it change over time in response to user interaction? If no → it's a constant.
2. Can it be computed from existing state or props? If yes → derive it, don't store it.
3. Is it already stored somewhere else? If yes → you have duplicate state.

Deliverable: `App` holds `categories`, `counters`, `selectedCategoryId`, and `selectedCounterId`. All derived values are computed during render.

---

## 3) Component breakdown

### View 1 — Category List (selectedCategoryId === null)
- `App`
  - `AddCategoryForm` — input for category name, submit button
  - `CategoryList` — renders all categories
    - `CategoryCard` — shows category name, created date, counter count, and an "Open" button

### View 2 — Category Detail (selectedCategoryId set, selectedCounterId === null)
- `App`
  - `CategoryDetail` — header with category name and back button
    - `AddCounterForm` — inputs for label, step, and mode
    - `CounterList` — renders summary cards for counters in this category
      - `CounterSummaryCard` — shows label, created date, mode, total, and an "Open" button, and a delete button

### View 3 — Counter Detail (selectedCategoryId set, selectedCounterId set)
- `App`
  - `CounterDetail` — header with counter label and back button
    - `SimpleCounterControls` — increment and decrement for simple counters
    - `SegmentedCounterControls` — add set button and list of segment rows
      - `SegmentRow` — one segment with increment, decrement, and delete

Deliverable: Component files exist and render placeholder text.

---

## 4) Build the UI skeleton (no behavior)

### View 1 — Category List

#### AddCategoryForm
- Text input: category name
- Button: Add Category

#### CategoryCard
- Category name
- Created date
- Number of counters in this category (derived)
- Button: Open
- Button: Delete

### View 2 — Category Detail

#### CategoryDetail
- Back button (returns to category list)
- Category name as heading
- `AddCounterForm`
- `CounterList`

#### AddCounterForm
- Text input: counter label
- Number input: step (default 1)
- Toggle or radio: Simple / Segmented
- Button: Add Counter

#### CounterSummaryCard
- Counter label
- Created date
- Mode label (Simple or Segmented)
- Derived total
- Button: Open
- Button: Delete

### View 3 — Counter Detail

#### CounterDetail
- Back button (returns to category detail)
- Counter label as heading
- Created date
- Renders either `SimpleCounterControls` or `SegmentedCounterControls`

#### SimpleCounterControls
- Decrement button
- Current count
- Increment button

#### SegmentedCounterControls
- List of `SegmentRow` components
- "Add Set" button

#### SegmentRow
- Set number label (derived from index, e.g. "Set 1")
- Current count
- Decrement button
- Increment button
- Delete button

### SimpleCounterControls
- Decrement button
- Current count
- Increment button

### SegmentedCounterControls
- List of `SegmentRow` components
- "Add Set" button

### SegmentRow
- Set number label (derived from index, e.g. "Set 1")
- Current count
- Decrement button
- Increment button
- Delete button

Deliverable: Both views render with hardcoded sample data.

---

## 5) Add a category

### Form state inside AddCategoryForm
```ts
const [name, setName] = useState("");
```

### On submit
- Validate `name.trim()` is not empty
- Create a new category:
```ts
const newCategory: Category = {
  id: crypto.randomUUID(),
  name: name.trim(),
  createdAt: new Date().toISOString(),
};
```
- Call `onAddCategory(newCategory)` and reset the form

Deliverable: Adding a category appends it to the list.

---

## 6) Navigate between views

`CategoryCard` "Open" button triggers `onSelectCategory(id)`, setting `selectedCategoryId`.

`CounterSummaryCard` "Open" button triggers `onSelectCounter(id)`, setting `selectedCounterId`.

Back buttons navigate one level up at a time:

```ts
function handleSelectCategory(id: string) {
  setSelectedCategoryId(id);
  setSelectedCounterId(null);
}

function handleSelectCounter(id: string) {
  setSelectedCounterId(id);
}

function handleBackToCategories() {
  setSelectedCategoryId(null);
  setSelectedCounterId(null);
}

function handleBackToCategory() {
  setSelectedCounterId(null);
}
```

> When navigating back to the category list, both `selectedCategoryId` and `selectedCounterId` are cleared. When navigating back to the category detail, only `selectedCounterId` is cleared.

Deliverable: All three views are reachable and back navigation works correctly at each level.

---

## 7) Add a counter

### Form state inside AddCounterForm
```ts
const [form, setForm] = useState({ label: "", step: 1, mode: "simple" as "simple" | "segmented" });
```

### On submit
- Validate `form.label.trim()` is not empty
- Build the correct counter shape based on `form.mode`:

```ts
const newCounter: Counter = form.mode === "simple"
  ? {
      id: crypto.randomUUID(),
      label: form.label,
      step: form.step,
      mode: "simple",
      count: 0,
      createdAt: new Date().toISOString(),
      categoryId: selectedCategoryId,
    }
  : {
      id: crypto.randomUUID(),
      label: form.label,
      step: form.step,
      mode: "segmented",
      segments: [],
      createdAt: new Date().toISOString(),
      categoryId: selectedCategoryId,
    };
```

Deliverable: Adding a counter appends it and associates it with the current category.

---

## 8) Simple counter — increment and decrement

`SimpleCounterControls` triggers `onIncrement(id)` and `onDecrement(id)`.

In `App`:
```ts
setCounters(prev =>
  prev.map(c =>
    c.id === id && c.mode === "simple"
      ? { ...c, count: c.count + c.step }
      : c
  )
);
```

> The `c.mode === "simple"` check is required before TypeScript will allow access to `c.count`.

Deliverable: Increment and decrement update the correct simple counter.

---

## 9) Segmented counter — add a segment

"Add Set" triggers `onAddSegment(counterId)`.

In `App`:
```ts
setCounters(prev =>
  prev.map(c =>
    c.id === counterId && c.mode === "segmented"
      ? { ...c, segments: [...c.segments, { id: crypto.randomUUID(), count: 0 }] }
      : c
  )
);
```

Deliverable: Clicking "Add Set" appends a new segment row at 0.

---

## 10) Segmented counter — increment and decrement a segment

`SegmentRow` triggers `onIncrementSegment(counterId, segmentId)` and `onDecrementSegment(counterId, segmentId)`.

In `App`:
```ts
setCounters(prev =>
  prev.map(c =>
    c.id === counterId && c.mode === "segmented"
      ? {
          ...c,
          segments: c.segments.map(s =>
            s.id === segmentId ? { ...s, count: s.count + c.step } : s
          ),
        }
      : c
  )
);
```

> Two levels of `map` — one to find the counter, one to find the segment. This is the nested immutable update pattern.

Deliverable: Increment and decrement update the correct segment on the correct counter.

---

## 11) Segmented counter — delete a segment

`SegmentRow` triggers `onDeleteSegment(counterId, segmentId)`.

In `App`:
```ts
setCounters(prev =>
  prev.map(c =>
    c.id === counterId && c.mode === "segmented"
      ? { ...c, segments: c.segments.filter(s => s.id !== segmentId) }
      : c
  )
);
```

Deliverable: Deleting a segment removes it without affecting other segments or counters.

---

## 12) Delete a counter

Delete button on `CounterCard` triggers `onDeleteCounter(id)`.

In `App`:
```ts
setCounters(prev => prev.filter(c => c.id !== id));
```

Deliverable: Deleting a counter removes it regardless of mode.

---

## 13) Delete a category

Delete button on `CategoryCard` triggers `onDeleteCategory(id)`.

In `App`, delete the category and all counters that belong to it:
```ts
setCategories(prev => prev.filter(c => c.id !== id));
setCounters(prev => prev.filter(c => c.categoryId !== id));
```

> Deleting a category is a two-step state update — remove the category and clean up its counters. Both updates happen in the same handler.

Deliverable: Deleting a category removes it and all its counters.

---

## 14) Edge cases and UX polish

- Disable "Add Category" button when name is empty
- Disable "Add Counter" button when label is empty
- Prevent simple counter count from going below 0
- Prevent segment count from going below 0
- Show "No categories yet — add one above" on the category list when empty
- Show "No counters yet — add one above" inside a category when empty
- Show "No sets yet — add one" inside a segmented counter with no segments
- Step input should have a minimum of 1
- Show counter count on CategoryCard (e.g. "3 counters") derived from `counters` filtered by `categoryId`

Deliverable: App feels solid with validation and empty states handled at every level.

---

## 15) Optional stretch goals (pick 1–2)

- **Persist to localStorage** — save and restore categories and counters across page refreshes using `useEffect`
- **Reset a counter** — zero out a simple counter or all segments on a segmented counter without deleting anything
- **Inline label editing** — click a counter or category name to edit it in place
- **Color themes per category** — each category gets a color chosen at creation that carries through to its counters

Deliverable: Add one stretch without breaking the core app.

---

## Suggested build order (quick checklist)

1. Types (`Segment`, `Category`, `SimpleCounter`, `SegmentedCounter`, `Counter`)
2. Component skeletons for all three views
3. Add category
4. Navigate into a category (View 1 → View 2)
5. Add counter
6. Navigate into a counter (View 2 → View 3)
7. Back navigation at each level
8. Simple counter increment and decrement
9. Segmented counter — add segment
10. Segmented counter — increment and decrement a segment
11. Segmented counter — delete a segment
12. Delete a counter
13. Delete a category (and its counters)
14. Edge cases and UX polish
15. One stretch goal (optional)

---

## Wireframes

### View 1 — Category List (selectedCategoryId === null)

```
┌─────────────────────────────────────────────────────┐
│  Counter Dashboard                                   │
├─────────────────────────────────────────────────────┤
│  Add Category                                        │
│                                                      │
│  Name  [ Gym                           ]             │
│                            [ Add Category ]          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Gym                                  [ Delete ]     │
│  Created: Mar 16, 2026                               │
│  3 counters                                          │
│                                          [ Open ]    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Beverages                            [ Delete ]     │
│  Created: Mar 16, 2026                               │
│  2 counters                                          │
│                                          [ Open ]    │
└─────────────────────────────────────────────────────┘
```

---

### View 2 — Category Detail (selectedCategoryId set, selectedCounterId === null)

```
┌─────────────────────────────────────────────────────┐
│  [ < Back ]   Gym                                    │
├─────────────────────────────────────────────────────┤
│  Add Counter                                         │
│                                                      │
│  Label  [ Pushups              ]                     │
│  Step   [ 1  ]                                       │
│  Mode   ( Simple )  ( Segmented )                    │
│                             [ Add Counter ]          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Pushups                              [ Delete ]     │
│  Created: Mar 16, 2026                               │
│  Segmented  |  Total: 28                             │
│                                          [ Open ]    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Coffees                              [ Delete ]     │
│  Created: Mar 16, 2026                               │
│  Simple  |  Total: 3                                 │
│                                          [ Open ]    │
└─────────────────────────────────────────────────────┘
```

---

### View 3 — Counter Detail (selectedCategoryId set, selectedCounterId set)

#### Segmented counter
```
┌─────────────────────────────────────────────────────┐
│  [ < Back ]   Pushups                                │
│  Created: Mar 16, 2026  |  Total: 28                 │
├─────────────────────────────────────────────────────┤
│  Set 1    [ - ]   10   [ + ]          [ Delete ]     │
│  Set 2    [ - ]   10   [ + ]          [ Delete ]     │
│  Set 3    [ - ]    8   [ + ]          [ Delete ]     │
│                                                      │
│                              [ + Add Set ]           │
└─────────────────────────────────────────────────────┘
```

#### Simple counter
```
┌─────────────────────────────────────────────────────┐
│  [ < Back ]   Coffees                                │
│  Created: Mar 16, 2026  |  Total: 3                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│                   [ - ]    3   [ + ]                 │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Definition of done

- Can add, view, and delete categories
- Can navigate from the category list into a category (View 1 → View 2)
- Can navigate from the category detail into a counter (View 2 → View 3)
- Back navigation works correctly at each level
- Can add simple and segmented counters to a category
- Simple counters track a single running count
- Segmented counters track multiple sets independently
- Can increment and decrement a simple counter
- Can add, increment, decrement, and delete segments on a segmented counter
- Can delete any counter regardless of mode
- Can delete a category and all its counters
- Each counter shows a created date and total in both the summary card and the detail view
- Each category shows a created date and a derived counter count
- All state lives in `App`; children communicate via props and callbacks
- All state updates use the functional `prev =>` form
- Discriminated union is used correctly — `mode` is always checked before accessing mode-specific fields
- Nested updates are immutable — no direct mutation at any level
- No derived data is stored in state
