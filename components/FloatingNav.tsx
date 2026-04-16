"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Info, Briefcase, Home, BookOpen, Mail } from "lucide-react";

const navLinks = [
    { href: "#", label: "Home", icon: <Home size={18} /> },
    { href: "#about", label: "About", icon: <Info size={18} /> },
    { href: "#services", label: "Services", icon: <Briefcase size={18} /> },
    { href: "#properties", label: "Properties", icon: <Briefcase size={18} /> },
    { href: "#blogs", label: "Blogs", icon: <BookOpen size={18} /> },
    { href: "#contact", label: "Contact", icon: <Mail size={18} /> },
];

export function FloatingNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col-reverse items-end gap-4">
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-2xl transition-colors duration-300 ${isOpen
                    ? "bg-brand-red border-brand-red text-white"
                    : "bg-white/80 dark:bg-black/80 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Menu Stack */}
            <div className="flex flex-col-reverse items-end gap-3">
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20, x: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, x: 10, scale: 0.8 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: i * 0.05,
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    onClick={() => setIsOpen(false)}
                                    className="group flex flex-row-reverse items-center gap-3"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md flex items-center justify-center text-zinc-900 dark:text-zinc-50 shadow-lg group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-300">
                                        {link.icon}
                                    </div>
                                    <motion.span
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.1 }}
                                        className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md text-[10px] uppercase tracking-widest font-sans font-bold text-zinc-900 dark:text-zinc-50 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                    >
                                        {link.label}
                                    </motion.span>
                                </motion.a>
                            ))}

                            {/* Theme Toggle in Menu */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, x: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, x: 10, scale: 0.8 }}
                                transition={{
                                    duration: 0.3,
                                    delay: navLinks.length * 0.05,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                className="group flex flex-row-reverse items-center gap-3"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md flex items-center justify-center text-zinc-900 dark:text-zinc-50 shadow-lg transition-all duration-300">
                                    <ThemeToggle />
                                </div>
                                <span className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-black/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md text-[10px] uppercase tracking-widest font-sans font-bold text-zinc-900 dark:text-zinc-50 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Appearance
                                </span>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
