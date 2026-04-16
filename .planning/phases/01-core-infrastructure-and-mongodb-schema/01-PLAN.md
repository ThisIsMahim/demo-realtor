# Phase 1: Core Infrastructure & MongoDB Schema

```yaml
wave: 1
depends_on: []
files_modified:
  - app/layout.tsx
  - tailwind.config.ts
  - lib/mongodb.ts
  - models/Listing.ts
autonomous: true
```

<task>
  <action>Install required `mongoose` and `next-cloudinary` dependencies using np.</action>
  <read_first>
    - package.json
  </read_first>
  <acceptance_criteria>
    - `package.json` contains `mongoose` and `next-cloudinary` in dependencies.
  </acceptance_criteria>
</task>

<task>
  <action>Create database connection singleton in `lib/mongodb.ts` mapping mongoose `cached.conn` and `cached.promise` state to avoid Next.js hot-reload explosion.</action>
  <read_first>
    - lib/mongodb.ts
  </read_first>
  <acceptance_criteria>
    - `lib/mongodb.ts` exports `connectToDatabase`
    - `mongoose.connect` is invoked inside a cache check
  </acceptance_criteria>
</task>

<task>
  <action>Create MongoDB `Listing` schema in `models/Listing.ts`. Fields: `title` (String), `price` (Number), `area` (String), `style` (String), `images` ([String]). Indexes `{ style: 1, price: 1 }` and `{ area: 1 }`.</action>
  <read_first>
    - lib/mongodb.ts
  </read_first>
  <acceptance_criteria>
    - `models/Listing.ts` exposes a Mongoose model
    - `ListingSchema.index` is present for style/price and area
  </acceptance_criteria>
</task>

<task>
  <action>Inject UI-UX Pro Max "Architecture Brutalist" configuration modifying `tailwind.config.ts` to extend `colors` adding `architecture` palette (`{ dark: '#0a0a0a', slate: '#1A1A1A', contrast: '#F5F5F0' }`). Set `darkMode: 'class'`.</action>
  <read_first>
    - tailwind.config.ts
    - design-system/MASTER.md
  </read_first>
  <acceptance_criteria>
    - `tailwind.config.ts` has `darkMode: 'class'`
    - `colors.architecture` contains '#0a0a0a'
  </acceptance_criteria>
</task>

<task>
  <action>Integrate global layout wrapping `app/layout.tsx` child nodes. Apply `<html className="dark architecture-bg text-architecture-contrast">` to set Dark mode layout, and configure `Playfair Display` (serif) font integration from `next/font/google`.</action>
  <read_first>
    - app/layout.tsx
    - tailwind.config.ts
  </read_first>
  <acceptance_criteria>
    - `<html>` element has dark mode classes.
    - Global font initialized using `next/font/google` in `app/layout.tsx`.
  </acceptance_criteria>
</task>
