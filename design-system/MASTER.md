# UI-UX Pro Max Design System: Demo Realtor

## 1. Core Aesthetic
- **Theme:** Dark Mode ("Architecture Brutalist" + "Quiet Luxury")
- **Vibe:** Cinematic, Premium, Minimalist, Gallery-like
- **Product Type:** Luxury Real Estate / Architectural Service

## 2. Colors
- **Background:** Deep rich black or architectural charcoal (evoking shadow and space)
- **Text:** High-contrast off-white for headings, muted grays for secondary text.
- **Accents:** Avoid neon or "AI purple". Use subtle, natural tones indicative of architecture.

## 3. Typography
- **Headings:** High-contrast Serif (`font-serif`, e.g., Playfair Display, editorial style).
- **Body/Metadata:** Wide-spaced, clean sans-serif or mono-spaced fonts. 

## 4. Layout
- **Structure:** Bento-Grid layouts heavily utilizing whitespace.
- **Anti-Pattern:** Standard 3-column "card" rows are strictly forbidden.

## 5. Interactions & Animation
- **Hover States:** Soft image scaling (1.05x) with depth-based immersive shadows.
- **Filtering:** Layout-ID animations (no abrupt refreshes).
- **Scroll:** Kinetic typography and "weighted" scroll animations using GSAP ScrollTrigger and Framer Motion. Smooth scroll via Lenis.
- **Easing:** Must use `cubic-bezier(0.33, 1, 0.68, 1)` for smooth, high-end momentum (No harsh easings).
