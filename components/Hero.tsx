"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    return (
        <header className="relative w-full h-[500px] lg:h-[750px] flex flex-col items-center">
            {/* Constrained Container for the Dome and Pop-out - Slightly narrower than content */}
            <div className="relative w-full max-w-5xl h-full flex flex-col items-center">

                {/* 0. Initial Skeleton Pulse Layer */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute inset-x-0 bottom-0 top-[100px] lg:top-[150px] z-0 flex flex-col items-center border-t border-x border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a]"
                >
                    <div className="w-full h-full bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
                </motion.div>

                {/* 1. The Monolithic Slab Wrapper (BASE LAYER - Z-10) */}
                <motion.div
                    initial={{ y: -120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
                    className="absolute left-0 right-0 bottom-0 top-[100px] lg:top-[150px] overflow-hidden bg-white dark:bg-[#0a0a0a] shadow-none border-t border-x border-zinc-200 dark:border-zinc-800 z-10"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {/* 2. Hero Background Image */}
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <Image
                            src="/building-with-bg.jpg"
                            alt="Hero Background"
                            fill
                            priority
                            className="object-cover object-bottom z-0 opacity-40 dark:opacity-15 pointer-events-none"
                            sizes="100vw"
                        />
                    </motion.div>
                </motion.div>

                {/* 2. Pop-Out Building Piece (MIDDLE LAYER - Z-20) */}
                <motion.div
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                    className="absolute inset-x-0 top-0 h-[500px] lg:h-[750px] z-20 pointer-events-none overflow-hidden"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity'
                    }}
                >
                    <Image
                        src="/building-bg-removed.png"
                        alt="Building Pop Out"
                        fill
                        priority
                        className="object-cover object-bottom scale-100 opacity-90 dark:opacity-80"
                    />
                </motion.div>

                {/* 3. Hero Content Layer (TOP LAYER - Z-30) */}
                <div className="absolute inset-x-0 bottom-0 top-[100px] lg:top-[150px] z-30 flex flex-col items-center pointer-events-none">
                    {/* Enhanced Readability Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0 pointer-events-none" />

                    {/* Hero Content */}
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-auto mb-16 md:mb-44 pointer-events-auto">
                        <h1 className="font-serif text-4xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] text-white selection:bg-zinc-100 selection:text-black mb-8 drop-shadow-2xl">
                            {["Simplifying", "Buying A Home"].map((line, lineIndex) => (
                                <span key={lineIndex} className="block overflow-hidden py-2 -my-2">
                                    {line.split(" ").map((word, wordIndex) => (
                                        <motion.span
                                            key={wordIndex}
                                            initial={{ y: "110%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                duration: 1.2,
                                                ease: [0.33, 1, 0.68, 1],
                                                delay: 1.0 + (lineIndex * 0.2) + (wordIndex * 0.1)
                                            }}
                                            className="inline-block mr-[0.2em] last:mr-0"
                                            style={{ willChange: 'transform, opacity' }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 1.6 }}
                            className="text-zinc-200 tracking-[0.3em] font-sans uppercase text-[10px] md:text-xs max-w-xl mx-auto px-4 font-bold bg-black/40 py-2 backdrop-blur-sm"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            Luxury Brutalist estates and minimal architectural masterpieces.
                        </motion.p>
                    </div>
                </div>
            </div>
        </header>
    );
}
