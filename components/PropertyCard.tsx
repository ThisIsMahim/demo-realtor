import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { IListing } from '../models/Listing';

interface PropertyCardProps {
    listing: Partial<IListing>;
    spanClass?: string;
}

export function PropertyCard({ listing, spanClass = "" }: PropertyCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : "";
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <motion.div
            ref={containerRef}
            layout
            layoutId={listing._id ? String(listing._id) : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className={`group relative overflow-hidden rounded-none bg-white dark:bg-architecture-slate transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] hover:shadow-2xl dark:hover:shadow-brand-red/10 cursor-pointer ${spanClass} border border-black/10 dark:border-white/10`}
        >
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-[ -15% ] w-[100%] h-[130%]"
                >
                    <Image
                        src={imageUrl}
                        alt={listing.title || 'Property Image'}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
                    />
                </motion.div>
                {/* Gradient overlay - lighter in light mode, darker in dark mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 dark:from-architecture-dark dark:via-architecture-dark/40 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-70 z-10" />
            </div>

            <div className="absolute inset-x-0 top-0 p-4 md:p-6 z-20 flex justify-between items-start pointer-events-none">
                {/* Status glass badge (Top Left) */}
                <div className="bg-brand-red dark:bg-brand-red/90 backdrop-blur-md rounded-none px-4 py-1.5 shadow-lg flex items-center md:opacity-0 md:translate-y-[-10px] transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-widest text-white">
                        {listing.status}
                    </span>
                </div>

                {/* Location glass badge (Top Right) */}
                <div className="bg-black/30 dark:bg-black/50 backdrop-blur-md rounded-none px-3 py-1 text-right flex items-center shadow-lg md:opacity-0 md:translate-y-[-10px] transition-all duration-700 delay-[50ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:translate-y-0 text-white/90 border border-white/10">
                    <span className="text-[9px] md:text-[10px] font-sans uppercase tracking-[0.2em]">
                        {listing.location}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <div className="flex flex-col gap-2 md:translate-y-4 md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
                    <div className="flex items-center">
                        <span className="text-[10px] md:text-xs tracking-widest text-white/70 dark:text-architecture-contrast/70 uppercase">
                            {listing.propertyType}
                        </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-4xl text-white dark:text-architecture-contrast mb-1 leading-tight">
                        {listing.title}
                    </h2>

                    <div className="flex items-center justify-between">
                        <div className="font-serif text-xl md:text-2xl text-white/90 dark:text-architecture-contrast/90 md:opacity-0 md:transition-opacity md:duration-700 md:delay-100 group-hover:opacity-100">
                            {listing.price ? formatPrice(listing.price) : 'Price Request'}
                        </div>
                        <div className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                            <span className="text-[10px] uppercase tracking-widest text-brand-red font-bold border-b border-brand-red/50 pb-0.5">See Details</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
