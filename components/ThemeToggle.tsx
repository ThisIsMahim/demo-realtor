"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-8 h-8" />; // Placeholder
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
