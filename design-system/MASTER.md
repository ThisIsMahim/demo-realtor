# UI-UX Pro Max Design System: Demo Realtor

## 1. Core Aesthetic
- **Theme:** Dark Mode ("High-Contrast Brutalism")
- **Vibe:** Monolithic, Absolute, Sharp, Architectural
- **Product Type:** Luxury Real Estate / Architectural Service
- **Rule:** ZERO rounded corners. All elements must be sharp-edged.

## 2. Colors
- **Background:** Deep rich black or architectural charcoal (`#0A0A0A`).
- **Text:** High-contrast off-white for headings, muted grays for secondary text.
- **Accents:** Brand Red (`#E11D48`) for strategic call-to-actions.
- **Borders:** Visible, sharp borders (`1px` to `2px`) between sections.

## 3. Typography
- **Headings:** High-contrast Serif (`font-serif`, e.g., Playfair Display, editorial style).
- **Body/Metadata:** Wide-spaced, clean sans-serif or mono-spaced fonts. 

## 4. Layout
- **Structure:** Bento-Grid layouts with sharp borders and monolithic slabs.
- **Anti-Pattern:** Curves, soft shadows, and rounded corners are strictly forbidden.

## 5. Interactions & Animation
- **Hover States:** Soft image scaling (1.05x) with sharp-edged highlight overlays.
- **Filtering:** Layout-ID animations (no abrupt refreshes).
- **Scroll:** Kinetic typography and "weighted" scroll animations using GSAP ScrollTrigger and Framer Motion. Smooth scroll via Lenis.
- **Easing:** Must use `cubic-bezier(0.33, 1, 0.68, 1)` for smooth, high-end momentum (No harsh easings).
