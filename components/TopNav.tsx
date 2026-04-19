"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";

export function TopNav() {
    return (
        <nav className="absolute top-0 left-0 right-0 z-[90] bg-transparent h-20 md:h-28 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center text-zinc-900 dark:text-zinc-50">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-white dark:text-black font-serif text-xl md:text-2xl font-bold transition-all duration-500 group-hover:bg-brand-red group-hover:text-white group-hover:rotate-6">
                        D
                    </div>
                    <span className="font-serif text-xl md:text-2xl font-medium tracking-tighter uppercase">
                        Demo<span className="text-zinc-500 font-light ml-2">Realtor</span>
                    </span>
                </Link>

                {/* Call Us Button */}
                <motion.button
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="group relative flex items-center text-white dark:text-white px-6 md:px-10 py-3 md:py-4 rounded-none text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(225,29,72,0.3)] overflow-hidden"
                    variants={{
                        initial: { backgroundColor: "#18181b" }, // bg-zinc-900 equivalent
                        hover: { backgroundColor: "#E11D48" }    // brand-red
                    }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                    <motion.div
                        variants={{
                            initial: { width: "auto", opacity: 1, marginRight: 12 },
                            hover: { width: 0, opacity: 0, marginRight: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        className="flex items-center pointer-events-none"
                    >
                        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-red transition-colors duration-500 group-hover:text-white" />
                    </motion.div>
                    <span className="relative z-10 transition-transform duration-500 lowercase first-letter:uppercase">Call us</span>
                </motion.button>
            </div>
        </nav>
    );
}
