# Phase 4: Database Integration & Hydration - Context

**Status:** Ready for planning

<domain>
## Phase Boundary
Replace the structurally hardcoded `mockListings` frontend boundary with real-time Server Component fetching mapped recursively to MongoDB `Listing` collections utilizing Mongoose.
</domain>

<decisions>
## Implementation Decisions
### Component Architecture
- `app/page.tsx` serves as the primary Server Component payload fetcher (`fetchListings()`). 
- Data serialization mapping is required out of Mongoose into standard `JSON` payloads avoiding Next.js `Date` and `ObjectID` serialization warnings passed to the `PropertyBrowser` Client Component.

### Data Seeding
- We will generate a lightweight `scripts/seed.ts` function designed to convert our `lib/mockListings.ts` into genuine DB items upon next execution testing, or utilize a Server action `/api/seed` temporarily for convenience without tsx runners.
</decisions>

<canonical_refs>
## Canonical References
- `.planning/REQUIREMENTS.md` — Requirement REQ-02: Database & Performance.
- `lib/mongodb.ts` & `models/Listing.ts`.
</canonical_refs>
