'use client';
import { motion } from 'framer-motion';

export function ShimmerEffect() {
    return (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-12" />
    );
}

export function PropertyCardSkeleton({ spanClass = "" }: { spanClass?: string }) {
    return (
        <div className={`relative w-full h-full overflow-hidden bg-zinc-200 dark:bg-zinc-800/80 rounded-none border border-black/10 dark:border-white/10 ${spanClass}`}>
            <ShimmerEffect />
            <div className="absolute inset-x-0 top-0 p-4 md:p-6 flex justify-between items-start">
                <div className="w-16 h-6 bg-zinc-300 dark:bg-zinc-700/50 rounded-none" />
                <div className="w-20 h-6 bg-zinc-300 dark:bg-zinc-700/50 rounded-none" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 space-y-4">
                <div className="w-24 h-4 bg-zinc-300 dark:bg-zinc-700/50 rounded-none" />
                <div className="w-3/4 h-8 bg-zinc-300 dark:bg-zinc-700/50 rounded-none" />
                <div className="flex justify-between items-center mt-2">
                    <div className="w-32 h-6 bg-zinc-300 dark:bg-zinc-700/50 rounded-none" />
                </div>
            </div>
        </div>
    );
}

export function PropertyGridSkeleton() {
    const getSpanClass = (index: number) => {
        switch (index) {
            case 0: return "md:col-span-2 md:row-span-2 min-h-[60vh] md:min-h-[80vh]";
            case 1: return "md:col-span-1 md:row-span-1 min-h-[40vh]";
            case 2: return "md:col-span-1 md:row-span-1 min-h-[40vh]";
            case 3: return "md:col-span-1 md:row-span-2 min-h-[60vh] md:min-h-[80vh]";
            case 4: return "md:col-span-2 md:row-span-1 min-h-[40vh]";
            case 5: return "md:col-span-1 md:row-span-1 min-h-[40vh]";
            default: return "md:col-span-1 md:row-span-1 min-h-[40vh]";
        }
    };

    return (
        <div className="w-full flex flex-col relative -mt-16 sm:-mt-20 md:-mt-24 z-30">
            {/* Filter Bar Skeleton */}
            <div className="sticky top-4 z-[60] w-full px-4 flex justify-center mb-8 hidden md:flex">
                <div className="w-full max-w-5xl h-12 md:h-14 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-none flex items-center relative overflow-hidden">
                    <ShimmerEffect />
                </div>
            </div>

            <div className="flex-1 w-full relative">
                <div className="relative z-10 px-0 md:px-12">
                    <section className="mx-auto w-full max-w-6xl py-8 md:py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
                            {[...Array(6)].map((_, i) => (
                                <PropertyCardSkeleton key={i} spanClass={getSpanClass(i)} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export function PropertyDetailsSkeleton() {
    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-background relative overflow-y-auto overflow-x-hidden md:overflow-hidden">
            <ShimmerEffect />

            {/* ── LEFT: HERO IMAGE SKELETON ── */}
            <div className="relative w-full md:w-1/2 h-[60vh] md:h-full border-b-[3px] md:border-b-0 md:border-r-[3px] border-black/10 dark:border-white/10 shrink-0 bg-zinc-200/50 dark:bg-[#0A0A0A]">
                {/* Status Badge Skeleton — top RIGHT */}
                <div className="absolute top-6 right-6 z-20">
                    <div className="w-24 h-8 bg-zinc-300 dark:bg-zinc-800" />
                </div>

                {/* Property type watermark Skeleton — bottom left */}
                <div className="absolute bottom-6 left-6 z-20">
                    <div className="w-48 h-4 bg-zinc-300 dark:bg-zinc-800" />
                </div>
            </div>

            {/* ── RIGHT: CONTENT PANEL SKELETON ── */}
            <div className="relative z-20 flex-1 md:w-1/2 md:overflow-y-auto flex flex-col bg-background">

                {/* TOP HEADER BLOCK SKELETON */}
                <div className="p-8 md:p-12 border-b border-black/10 dark:border-white/10">
                    {/* Subtitle */}
                    <div className="w-40 h-3 bg-zinc-200 dark:bg-zinc-800/80 mb-3" />
                    {/* Title */}
                    <div className="w-3/4 h-10 md:h-12 bg-zinc-200 dark:bg-zinc-800/80 mb-4" />
                    <div className="w-1/2 h-10 md:h-12 bg-zinc-200 dark:bg-zinc-800/80 mb-8" />

                    {/* Price row Skeleton */}
                    <div className="flex items-center justify-between border border-black/10 dark:border-white/10 p-5">
                        <div className="w-24 h-3 bg-zinc-200 dark:bg-zinc-800/80" />
                        <div className="w-32 h-8 bg-zinc-200 dark:bg-zinc-800/80" />
                    </div>
                </div>

                {/* SPECS ROW SKELETON */}
                <div className="grid grid-cols-4 border-b border-black/10 dark:border-white/10">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`flex flex-col gap-2 p-5 md:p-6 ${i < 3 ? 'border-r border-black/10 dark:border-white/10' : ''}`}
                        >
                            <div className="w-10 h-2 bg-zinc-200 dark:bg-zinc-800/80" />
                            <div className="w-12 h-6 md:h-8 bg-zinc-200 dark:bg-zinc-800/80" />
                        </div>
                    ))}
                </div>

                {/* DESCRIPTION SKELETON */}
                <div className="p-8 md:p-12 flex-1 border-b border-black/10 dark:border-white/10 space-y-5">
                    <div className="w-40 h-3 bg-zinc-200 dark:bg-zinc-800/80 mb-6" />

                    <div className="space-y-3">
                        <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800/80" />
                        <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800/80" />
                        <div className="w-11/12 h-4 bg-zinc-200 dark:bg-zinc-800/80" />
                        <div className="w-4/5 h-4 bg-zinc-200 dark:bg-zinc-800/80" />
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800/80" />
                        <div className="w-10/12 h-4 bg-zinc-200 dark:bg-zinc-800/80" />
                    </div>

                    {/* Feature tags SKELETON */}
                    <div className="flex flex-wrap gap-2 pt-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-24 h-8 bg-zinc-200 dark:bg-zinc-800/80 border border-black/10 dark:border-white/10" />
                        ))}
                    </div>
                </div>

                {/* CTA BLOCK SKELETON */}
                <div className="p-8 md:p-12 bg-zinc-100 dark:bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="w-full md:w-auto">
                        <div className="w-64 h-6 bg-zinc-200 dark:bg-zinc-800/80 mb-3" />
                        <div className="w-48 h-3 bg-zinc-200 dark:bg-zinc-800/80" />
                    </div>
                    <div className="w-full md:w-48 h-12 bg-zinc-200 dark:bg-zinc-800/80 shrink-0" />
                </div>
            </div>
        </div>
    );
}
