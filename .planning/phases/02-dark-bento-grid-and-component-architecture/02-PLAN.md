# Phase 2: Dark Bento Grid & Component Architecture

```yaml
wave: 1
depends_on: []
files_modified:
  - lib/mockListings.ts
  - components/PropertyCard.tsx
  - components/BentoGrid.tsx
  - app/page.tsx
autonomous: true
```

<task>
  <action>Create `lib/mockListings.ts` containing an array of 6 mocked `{ id, title, price, area, style, images }` properties matching the `IListing` schema shapes.</action>
  <read_first>
    - models/Listing.ts
  </read_first>
  <acceptance_criteria>
    - `lib/mockListings.ts` exports `mockListings` array.
    - Array contains fields reflecting the MongoDB schema requirements.
  </acceptance_criteria>
</task>

<task>
  <action>Create a `PropertyCard.tsx` in `components/` expecting a `listing` and `spanClass` prop. Use a Tailwind styled architectural dark card (`bg-architecture-slate`, rounded corners). Include a relatively positioned image container holding the first listing image using `next/image` with `object-cover`. Add a `bg-gradient-to-t` from `#0a0a0a` to transparent overlay to protect text contrast. Render `title` and `price` (using `font-serif text-architecture-contrast text-2xl`) and `area`/`style` inside.</action>
  <read_first>
    - design-system/MASTER.md
  </read_first>
  <acceptance_criteria>
    - Component file created.
    - Props map to listing details properly with overlay gradient rendering.
    - Tailwind classes correctly specify architecture colors and typo rules.
  </acceptance_criteria>
</task>

<task>
  <action>Create a `BentoGrid.tsx` container component in `components/`. Render a `div` mapped to `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-8 max-w-[1600px] mx-auto`. Inside, map the `listings` prop to `PropertyCard` nodes. Assign structural span classes natively derived from index (e.g. index 0 equals `md:col-span-2 md:row-span-2` for 'Hero', others regular spans).</action>
  <read_first>
    - components/PropertyCard.tsx
  </read_first>
  <acceptance_criteria>
    - Component establishes CSS Grid system.
    - Dynamic column spans applied based on mapped indices to ensure a non-standard 3-card layout.
  </acceptance_criteria>
</task>

<task>
  <action>Update `app/page.tsx` replacing standard boilerplate. Import `mockListings` and `BentoGrid`. Return a structurally semantic `<main>` tag housing a Header section (using `Playfair Display`) establishing the "Woodland" architecture platform branding, followed by the `BentoGrid` passed the `mockListings`.</action>
  <read_first>
    - app/page.tsx
    - components/BentoGrid.tsx
  </read_first>
  <acceptance_criteria>
    - Default Next.js boilerplate erased.
    - `page.tsx` correctly integrates `BentoGrid` using mock data.
    - Branding headers reflect luxury real estate.
  </acceptance_criteria>
</task>
