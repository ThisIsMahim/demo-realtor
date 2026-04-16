"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#services", label: "Services" },
        { href: "#properties", label: "Properties" },
        { href: "#blogs", label: "Blogs" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <nav className="absolute top-0 left-0 w-full px-8 py-4 md:px-16 md:py-6 z-[100] flex justify-between items-center text-zinc-900 dark:text-zinc-50 backdrop-blur-md bg-white/20 dark:bg-black/20 border-b border-zinc-200/50 dark:border-zinc-800/50">
            <a href="#" className="font-serif text-2xl tracking-tighter cursor-pointer z-50 text-brand-red font-bold">demo.</a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
                <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] font-sans">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="hover:text-brand-red transition-colors">{link.label}</a>
                    ))}
                </div>
                <div className="h-4 w-px bg-foreground/20 ml-4 mr-0" />
                <ThemeToggle />
            </div>

            <div className="hidden md:block">
                <button className="px-6 py-2.5 rounded-full border border-foreground/30 text-xs font-sans hover:bg-foreground/10 transition-colors uppercase tracking-widest">
                    Select Project
                </button>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex items-center gap-4 md:hidden z-[110]">
                <ThemeToggle />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -mr-2 w-10 h-10 flex flex-col items-center justify-center relative"
                    aria-label="Toggle Menu"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-0.5 bg-foreground absolute"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0, transition: { duration: 0.2 } } : { opacity: 1, transition: { duration: 0.3 } }}
                        className="w-6 h-0.5 bg-foreground absolute"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-0.5 bg-foreground absolute"
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-serif text-foreground/90 hover:text-brand-red transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                        <button className="mt-16 px-8 py-3 rounded-full border border-foreground/30 text-xs font-sans uppercase tracking-[0.2em] text-foreground">
                            Select Project
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
