"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export const CustomCursor = () => {
    const { theme, resolvedTheme } = useTheme();
    const currentTheme = resolvedTheme || theme;
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring configuration for the outer cursor
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const outerX = useSpring(mouseX, springConfig);
    const outerY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive =
            target.closest('a') ||
            target.closest('button') ||
            target.closest('[data-cursor="hover"]') ||
            target.tagName.toLowerCase() === 'input' ||
            target.tagName.toLowerCase() === 'textarea';

        setIsHovering(!!isInteractive);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleOver]);

    const cursorColor = currentTheme === "dark" ? "#FFFFFF" : "#000000";
    const inverseColor = currentTheme === "dark" ? "#000000" : "#FFFFFF";

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Outer Square - Leading/Lagging Frame */}
                        <motion.div
                            style={{
                                left: outerX,
                                top: outerY,
                                x: "-50%",
                                y: "-50%",
                                borderColor: cursorColor,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isHovering ? 1.5 : 1,
                                opacity: 1,
                                rotate: isHovering ? 45 : 0
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute w-10 h-10 border-[1.5px] hidden md:block transition-colors duration-500"
                        >
                            {/* Subtle outline for visibility on opposite backgrounds */}
                            <div className="absolute inset-[-1px] border border-white/20 dark:border-black/20 pointer-events-none" />
                        </motion.div>

                        {/* Inner Square - Precise Tracking Dot */}
                        <motion.div
                            style={{
                                left: mouseX,
                                top: mouseY,
                                x: "-50%",
                                y: "-50%",
                                backgroundColor: cursorColor,
                            }}
                            initial={{ scale: 0 }}
                            animate={{
                                scale: isClicking ? 0.8 : 1,
                                opacity: isHovering ? 0 : 1
                            }}
                            exit={{ scale: 0 }}
                            className="absolute w-1.5 h-1.5 hidden md:block transition-colors duration-500 shadow-[0_0_2px_rgba(0,0,0,0.5)] dark:shadow-[0_0_2px_rgba(255,255,255,0.5)]"
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
