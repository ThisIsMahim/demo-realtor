# Phase 1: Core Infrastructure & MongoDB Schema - Context

**Status:** Ready for planning

<domain>
## Phase Boundary
Initialize Next.js 15 routing, configure MongoDB Mongoose schemas with indexing, establish global Tailwind styling adhering to 'Architecture Brutalist', and configure Cloudinary dependencies.
</domain>

<decisions>
## Implementation Decisions
### Framework & Database
- Core Framework: Next.js 15 (App Router).
- Database: MongoDB via Mongoose. Needs cached singleton connection in Next.js.
- Schema: Realtor listings must support filtering by `style`, `area`, `price`.

### UI/UX Rules
- Deep charcoal/black backgrounds (`#0a0a0a`).
- Bento-grid component structure setup in global styles.
- Typography: Setup Google Fonts (High-contrast Serif for headings, Mono/Sans for metadata).
</decisions>

<canonical_refs>
## Canonical References
- `design-system/MASTER.md` — Visual rules and aesthetic bounds.
</canonical_refs>
