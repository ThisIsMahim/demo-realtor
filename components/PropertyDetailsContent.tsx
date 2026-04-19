import { IListing } from "@/models/Listing";
import Image from "next/image";

export function PropertyDetailsContent({ listing }: { listing: Partial<IListing> }) {
    const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : "";
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    };

    // Hardcode some demo architectural stats to match the vibe
    const beds = 4;
    const baths = 3.5;
    const sqft = 4200;

    return (
        <div data-lenis-prevent="true" className="flex flex-col md:flex-row w-full h-full bg-background text-foreground overflow-y-auto overflow-x-hidden md:overflow-hidden">

            {/* ── LEFT: HERO IMAGE ── */}
            <div className="relative w-full md:w-1/2 h-[60vh] md:h-full border-b-[3px] md:border-b-0 md:border-r-[3px] border-black dark:border-white/10 shrink-0 bg-[#0A0A0A]">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={listing.title || 'Property Image'}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10" />

                {/* Status Badge — top RIGHT of image */}
                <div className="absolute top-6 right-6 z-20">
                    <div className="bg-brand-red text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2">
                        {listing.status}
                    </div>
                </div>

                {/* Property type watermark — bottom left of image */}
                <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-mono">
                        {listing.propertyType} · {listing.location}
                    </span>
                </div>
            </div>

            {/* ── RIGHT: CONTENT PANEL ── */}
            <div className="relative z-20 flex-1 md:w-1/2 md:overflow-y-auto flex flex-col bg-background">

                {/* TOP HEADER BLOCK */}
                <div className="p-8 md:p-12 border-b border-black/10 dark:border-white/10">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-400 block mb-3">
                        {listing.propertyType} · {listing.location}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-black dark:text-white leading-[1.05] mb-8">
                        {listing.title}
                    </h1>

                    {/* Price row */}
                    <div className="flex items-center justify-between border border-black/10 dark:border-white/10 p-5">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Asking Price</span>
                        <div className="text-3xl font-serif text-brand-red">
                            {listing.price ? formatPrice(listing.price) : 'P.O.R'}
                        </div>
                    </div>
                </div>

                {/* SPECS ROW */}
                <div className="grid grid-cols-4 border-b border-black/10 dark:border-white/10">
                    {[
                        { label: 'Beds', val: beds },
                        { label: 'Baths', val: baths },
                        { label: 'SQFT', val: sqft.toLocaleString() },
                        { label: 'Type', val: listing.propertyType || 'Villa' },
                    ].map((spec, i) => (
                        <div
                            key={i}
                            className={`flex flex-col gap-1 p-5 md:p-6 hover:bg-zinc-100 dark:hover:bg-white/[0.03] transition-colors ${i < 3 ? 'border-r border-black/10 dark:border-white/10' : ''}`}
                        >
                            <span className="text-[9px] uppercase tracking-widest text-zinc-400">{spec.label}</span>
                            <span className="text-xl md:text-2xl font-serif text-black dark:text-white">{spec.val}</span>
                        </div>
                    ))}
                </div>

                {/* DESCRIPTION */}
                <div className="p-8 md:p-12 flex-1 border-b border-black/10 dark:border-white/10 space-y-5">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-6">About the Property</h3>
                    <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Presenting an extraordinary architectural achievement in the heart of {listing.location}.{' '}
                        <em>{listing.title}</em> embodies the principles of modern brutalism and high-contrast luxury,
                        featuring monolithic concrete slabs, expansive floor-to-ceiling glass, and uncompromising
                        spatial design.
                    </p>
                    <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        Designed for those who demand absolute distinction, every edge is critically sharp,
                        every material meticulously selected. The interplay of light and shadow throughout the
                        day redefines the living experience.
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                        {['Floor-to-Ceiling Glass', 'Private Courtyard', 'Smart Home', 'Wine Cellar', 'Rooftop Terrace'].map((f) => (
                            <span key={f} className="text-[9px] uppercase tracking-widest border border-black/15 dark:border-white/10 px-3 py-1.5 text-zinc-500 dark:text-zinc-400">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA BLOCK */}
                <div className="p-8 md:p-12 bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-serif text-white mb-1">Schedule a Private Viewing</h3>
                        <p className="text-xs text-zinc-400 tracking-wide">Strictly by appointment. Our architectural team will be in touch.</p>
                    </div>
                    <button className="px-8 py-4 bg-brand-red text-white uppercase tracking-widest text-xs font-bold hover:bg-red-700 transition-colors shrink-0 w-full md:w-auto">
                        Request Access →
                    </button>
                </div>
            </div>
        </div>
    );
}
