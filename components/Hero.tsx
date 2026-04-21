"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    const headline = ["Simplifying", "Buying A Home"];

    // Custom easing for premium feel
    const expoOut = [0.16, 1, 0.3, 1] as const;

    return (
        <header className="relative w-full h-[500px] lg:h-[750px] flex flex-col items-center">
            {/* Constrained Container for the Dome and Pop-out */}
            <div className="relative w-full max-w-5xl h-full flex flex-col items-center">

                {/* 0. Initial Skeleton Pulse Layer */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute inset-x-0 bottom-0 top-[100px] lg:top-[150px] z-[5] flex flex-col items-center border-t border-x border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a]"
                >
                    <div className="w-full h-full bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse" />
                </motion.div>

                {/* 1. The Monolithic Slab Wrapper (BASE LAYER) */}
                <motion.div
                    initial={{ scaleY: 0, originY: 1, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: expoOut, delay: 0.1 }}
                    className="absolute left-0 right-0 bottom-0 top-[100px] lg:top-[150px] overflow-hidden bg-white dark:bg-[#0a0a0a] border-t border-x border-zinc-200 dark:border-zinc-800 z-10"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {/* 2. Hero Background Image with focus shift */}
                    <motion.div
                        initial={{ scale: 1.15, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 2.2, ease: expoOut, delay: 0.3 }}
                        className="absolute inset-0 pointer-events-none"
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

                {/* 2. Pop-Out Building Piece (MIDDLE LAYER) */}
                <motion.div
                    initial={{ y: 60, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 80,
                        mass: 1,
                        delay: 0.2
                    }}
                    className="absolute inset-x-0 top-0 h-[500px] lg:h-[750px] z-20 pointer-events-none overflow-hidden"
                >
                    <Image
                        src="/building-bg-removed.png"
                        alt="Building Pop Out"
                        fill
                        priority
                        className="object-cover object-bottom scale-100 opacity-90 dark:opacity-80"
                    />
                </motion.div>

                {/* 3. Hero Content Layer (TOP LAYER) */}
                <div className="absolute inset-x-0 bottom-0 top-[100px] lg:top-[150px] z-30 flex flex-col items-center pointer-events-none">
                    {/* Enhanced Readability Gradient Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none"
                    />

                    {/* Hero Content */}
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-auto mb-16 md:mb-44 pointer-events-auto" data-cursor="hover">
                        <h1 className="font-serif text-4xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] text-white selection:bg-zinc-100 selection:text-black mb-8 drop-shadow-2xl">
                            {headline.map((line, lineIndex) => (
                                <span key={lineIndex} className="block overflow-hidden py-2 -my-2">
                                    {line.split("").map((char, charIndex) => (
                                        <motion.span
                                            key={charIndex}
                                            initial={{ y: "100%", opacity: 0, filter: 'blur(8px)' }}
                                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                            transition={{
                                                duration: 1.0,
                                                ease: expoOut,
                                                delay: 0.8 + (lineIndex * 0.2) + (charIndex * 0.03)
                                            }}
                                            className="inline-block"
                                            style={{ willChange: 'transform, opacity, filter', whiteSpace: char === " " ? 'pre' : 'normal' }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1.5, ease: expoOut, delay: 1.8 }}
                            className="text-zinc-200 tracking-[0.3em] font-sans uppercase text-[10px] md:text-xs max-w-xl mx-auto px-6 py-3 font-bold bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            Luxury Brutalist estates and minimal architectural masterpieces.
                        </motion.p>
                    </div>
                </div>
            </div>
        </header>
    );
}

