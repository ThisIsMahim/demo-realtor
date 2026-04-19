"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        // Fallback: no View Transitions API support
        if (
            !("startViewTransition" in document) ||
            typeof (document as Document & { startViewTransition?: unknown }).startViewTransition !== "function"
        ) {
            setTheme(nextTheme);
            return;
        }

        // Get the button's center coordinates for the ripple origin
        const btn = buttonRef.current;
        const rect = btn?.getBoundingClientRect();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

        // Largest possible distance from the click point to a corner
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transition = (document as any).startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.ready.then(() => {
            // Always expand the *incoming* theme via ::view-transition-new(root).
            // Animating ::view-transition-old only works when old is on top,
            // but by default new(root) renders above old — so expanding new
            // is the correct approach for both light→dark and dark→light.
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 600,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    return (
        <button
            ref={buttonRef}
            onClick={handleToggle}
            className="relative flex items-center justify-center w-10 h-10 rounded-none bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 transition-colors cursor-pointer"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === "dark" ? 0 : 180,
                    scale: theme === "dark" ? 0 : 1,
                    opacity: theme === "dark" ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-brand-red" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === "dark" ? 0 : -180,
                    scale: theme === "dark" ? 1 : 0,
                    opacity: theme === "dark" ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-brand-red" />
            </motion.div>
        </button>
    );
}
