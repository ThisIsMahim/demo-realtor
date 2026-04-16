# Phase 1 Research

## 1. Database Connection Management
In Next.js, excessive hot reloads in development can exhaust MongoDB connection pools. A global caching technique must be used for the Mongoose connection inside `lib/mongodb.ts`.

## 2. Listing Schema Indexes
To ensure filter efficiency (Area, Style, Price), MongoDB indexes should be applied appropriately in `models/Listing.ts`:
- Compound index on `{ style: 1, price: 1 }`
- Simple index on `{ area: 1 }` 

## 3. Tailwind Architecture Brutalist Styling
- Extend `colors` in `tailwind.config.ts` to include `architecture: { dark: '#0a0a0a', slate: '#1A1A1A', contrast: '#F5F5F0' }`.
- Ensure font families for serif (e.g. Playfair Display) and mono are injected.

## 4. Dependencies Needed
- Next.js is configured, but `mongoose` needs to be verified/installed during execution.
- Cloudinary can be accessed via `@cloudinary/url-gen` or `next-cloudinary`. We will install `next-cloudinary`.
