# Phase 2: Dark Bento Grid & Component Architecture - Context

**Status:** Ready for planning

<domain>
## Phase Boundary
Build the primary application layout encompassing the luxury dark-themed bento grid structure, integrating high-contrast fonts, and global architectural styling.
</domain>

<decisions>
## Implementation Decisions
### Component Architecture
- Use React Server Components by default. Include `use client` strictly where interactions (like filtering later down) dictate.
- The Bento Grid must NOT be a standard 3-column layout. It should feature variable column/row spans (e.g., featured items taking `col-span-2 row-span-2`).

### UI/UX Rules (From MASTER.md)
- Dark Mode / Deep charcoal architectural backgrounds.
- High-contrast Serif headings (Playfair Display) for titles, prices.
- Sans-serif/Mono for metadata (Area, Style).
- Utilize Tailwind's CSS grid (`grid-cols-4` or `grid-cols-6`) with distinct component sizing.
</decisions>

<canonical_refs>
## Canonical References
- `design-system/MASTER.md` — Visual rules and aesthetic bounds.
- `.planning/REQUIREMENTS.md` — Requirement REQ-03: UI / Visual Architecture.
</canonical_refs>
