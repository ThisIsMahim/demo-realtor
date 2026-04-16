# Phase 3: Interactive Filters & Layout Animations

```yaml
wave: 1
depends_on: []
files_modified:
  - components/PropertyCard.tsx
  - components/BentoGrid.tsx
  - components/PropertyBrowser.tsx
  - app/page.tsx
autonomous: true
```

<task>
  <action>Refactor `components/PropertyCard.tsx` wrapping the core `div` with `<motion.div>` imported from `framer-motion`. Ensure `layout` and `layoutId={listing._id}` props are applied to enable fluid sorting transitions.</action>
  <read_first>
    - components/PropertyCard.tsx
  </read_first>
  <acceptance_criteria>
    - `PropertyCard` uses `motion.div`.
    - `layout` and `layoutId` props exist for layout animations.
  </acceptance_criteria>
</task>

<task>
  <action>Refactor `components/BentoGrid.tsx` importing `AnimatePresence` from `framer-motion`. Wrap the inner `{listings.map}` iteration in `<AnimatePresence mode="popLayout">`. Update the component to indicate `"use client"` if needed for `AnimatePresence`.</action>
  <read_first>
    - components/BentoGrid.tsx
  </read_first>
  <acceptance_criteria>
    - `BentoGrid.tsx` maps mapped iteration inside `AnimatePresence`.
  </acceptance_criteria>
</task>

<task>
  <action>Create a new `'use client'` component `components/PropertyBrowser.tsx`. This element will accept `initialListings` data, implement filter `useState` logic for `style` and `area`, render a minimal luxury-styled filter bar UI above, and parse the filtered array into `<BentoGrid listings={filtered} />`.</action>
  <read_first>
    - lib/mockListings.ts
  </read_first>
  <acceptance_criteria>
    - Filtering controls render horizontally with styles mapping to unique data.
    - Component state filters properties accurately based on user selection.
  </acceptance_criteria>
</task>

<task>
  <action>Update `app/page.tsx` integrating `<PropertyBrowser initialListings={mockListings} />` directly substituting `<BentoGrid />` to inject client behavior efficiently below the woodland headers.</action>
  <read_first>
    - app/page.tsx
  </read_first>
  <acceptance_criteria>
    - `PropertyBrowser` acts as the intermediary displaying the Grid.
  </acceptance_criteria>
</task>
