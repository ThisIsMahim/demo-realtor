'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PropertyDetailsDrawer({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        setIsOpen(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            router.back();
        }, 400); // match transition duration roughly
    };

    const drawerVariants = {
        hidden: {
            x: isMobile ? 0 : '100%',
            y: isMobile ? '100%' : 0,
            opacity: isMobile ? 0.8 : 1,
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring' as const,
                damping: 25,
                stiffness: 120,
                mass: 0.8,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        },
        exit: {
            x: isMobile ? 0 : '100%',
            y: isMobile ? '100%' : 0,
            opacity: isMobile ? 0 : 1,
            transition: {
                type: 'spring' as const,
                damping: 30,
                stiffness: 150,
                duration: 0.4
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 dark:bg-black/80 cursor-pointer"
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full h-full bg-background shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Back Button Top Left - Animated Reveal */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            onClick={handleClose}
                            className="absolute top-4 left-4 md:top-6 md:left-6 z-[150] px-4 py-2 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-brand-red dark:hover:bg-brand-red hover:text-white transition-colors shadow-xl"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            <span className="text-xs uppercase tracking-widest font-bold">Back</span>
                        </motion.button>

                        <motion.div
                            className="flex-1 w-full h-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

