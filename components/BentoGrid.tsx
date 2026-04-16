"use client";

import { IListing } from '../models/Listing';
import { PropertyCard } from './PropertyCard';
import { AnimatePresence } from 'framer-motion';

interface BentoGridProps {
    listings: Partial<IListing>[];
}

export function BentoGrid({ listings }: BentoGridProps) {
    const getSpanClass = (index: number) => {
        switch (index) {
            case 0: return "md:col-span-2 md:row-span-2 min-h-[60vh] md:min-h-[80vh]"; // Hero feature
            case 1: return "md:col-span-1 md:row-span-1 min-h-[40vh]"; // Standard
            case 2: return "md:col-span-1 md:row-span-1 min-h-[40vh]"; // Standard
            case 3: return "md:col-span-1 md:row-span-2 min-h-[60vh] md:min-h-[80vh]"; // Tall pillar
            case 4: return "md:col-span-2 md:row-span-1 min-h-[40vh]"; // Wide bottom
            case 5: return "md:col-span-1 md:row-span-1 min-h-[40vh]"; // Standard
            default: return "md:col-span-1 md:row-span-1 min-h-[40vh]";
        }
    };

    return (
        <section className="mx-auto w-full max-w-6xl py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
                <AnimatePresence mode="popLayout">
                    {listings.map((listing, index) => (
                        <PropertyCard
                            key={listing._id ? String(listing._id) : `listing-${index}`}
                            listing={listing}
                            spanClass={getSpanClass(index)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
