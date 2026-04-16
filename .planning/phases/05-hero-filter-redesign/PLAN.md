# Phase 5: Hero and Filter Redesign

## Goal
Redesign the initial user view to match the provided visual reference structure (not font/text):
- A large, immersive hero section (likely an architectural background image or video) spanning the full width and bleeding into the properties list.
- A floating, glassmorphic search/filter bar placed directly OVER the hero image, replacing the previous horizontal filter pills.
- The property layout (`BentoGrid`) should have a slightly negative margin on desktop to "bleed" or overlay seamlessly into the bottom of the hero section.

## Details

### 1. `app/page.tsx` Updates
- Replace the simple text `<header>` with a visually rich Hero container with a high-res background image from Cloudinary (or a placeholder background layout that fits the structural need).
- We will integrate the Top Navigation into the Hero.
- The text "The Woodland Collection" will be the primary overlay title. 

### 2. `components/PropertyBrowser.tsx` Updates
- Extract or modify the `Structural Filter Bar`. It must no longer be a sticky sub-header; instead, it should be a floating bar inside the `Hero` section or overlaid tightly with absolute/relative positioning.
- Update the filter UI to resemble unified dropdowns/selectors (e.g., Area, Style, Bedrooms) inside a single dark glass semi-transparent bar, instead of individual floating pill buttons.

### 3. "Bleeding Layout" Integration
- Establish a visual connection where the `div` containing `BentoGrid` has a negative top margin (e.g. `-mt-16` or `-mt-24`) so properties begin floating over the bottom edge of the hero image, creating a fluid transition.

## Validation
- Ensure no fonts or text from the image are used, retaining the "brutalist / quiet luxury" and our custom `architecture-dark` theme.
- Confirm filtering state still functions smoothly and layout transitions correctly.
