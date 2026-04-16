# Phase 2 Research

## 1. Bento Grid Implementation Strategies
A bento grid in Tailwind CSS is typically built using CSS Grid with dynamically sized items:
- The parent container should use `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4`.
- Featured property items can use `md:col-span-2 md:row-span-2` to break the standard card uniformity.
- Standard items take `col-span-1 row-span-1`.
- A wide item can be `col-span-2 row-span-1`.

## 2. Server vs Client Components
To maximize performance:
- The main `page.tsx` should be a Server Component fetching listings (or mock listings for now).
- The `BentoGrid` container will be a server component.
- The individual `PropertyCard` can also be a server component initially, though Phase 3 will introduce hover animations via Framer Motion that might require converting it to a client component. For now, it stays semantic HTML+CSS.

## 3. High-Contrast Typography
In 'Architecture Brutalist' styling:
- Prices should be prominently styled, e.g., `text-4xl font-serif tracking-tight text-architecture-contrast`.
- Overlays on images: Dark gradient overlays (`bg-gradient-to-t from-architecture-dark to-transparent`) are needed on thumbnails to ensure text legibility.

## 4. Next-Cloudinary Strategy
- Next.js `next/image` or `next-cloudinary`'s `CldImage` should be utilized with `fill` and `object-cover` within a relatively positioned `div` container.
