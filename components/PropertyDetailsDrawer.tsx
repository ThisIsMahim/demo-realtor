'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PropertyDetailsDrawer({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            router.back();
        }, 700); // match transition duration
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        className="relative w-full h-full bg-background shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Back Button Top Left */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 left-4 md:top-6 md:left-6 z-[150] px-4 py-2 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-brand-red dark:hover:bg-brand-red hover:text-white transition-colors shadow-xl"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span className="text-xs uppercase tracking-widest font-bold">Back</span>
                        </button>

                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
