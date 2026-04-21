"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronUp, ChevronDown, ArrowRight, Calendar, Clock } from "lucide-react";

/* ─────────────────────────────────── helpers ─────────────────────────────── */

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

function formatDate(date: Date) {
    return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(h: number, m: number) {
    const period = h >= 12 ? "PM" : "AM";
    const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${dh.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
}

/* ─────────────────────────────────── easing ─────────────────────────────── */

const ease: [number, number, number, number] = [0.33, 1, 0.68, 1];

/* ─────────────────────────────── mini calendar ──────────────────────────── */

interface CalendarProps {
    selected: Date | null;
    onSelect: (d: Date) => void;
}

function MiniCalendar({ selected, onSelect }: CalendarProps) {
    const today = new Date();
    const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

    const totalDays = getDaysInMonth(view.year, view.month);
    const startDay = getFirstDayOfMonth(view.year, view.month);

    const prevMonth = () =>
        setView((v) => {
            const d = new Date(v.year, v.month - 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });

    const nextMonth = () =>
        setView((v) => {
            const d = new Date(v.year, v.month + 1);
            return { year: d.getFullYear(), month: d.getMonth() };
        });

    const isDisabled = (day: number) => {
        const d = new Date(view.year, view.month, day);
        d.setHours(0, 0, 0, 0);
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return d < t;
    };

    const isSelected = (day: number) => {
        if (!selected) return false;
        return (
            selected.getDate() === day &&
            selected.getMonth() === view.month &&
            selected.getFullYear() === view.year
        );
    };

    const cells = Array.from({ length: startDay + totalDays }, (_, i) =>
        i < startDay ? null : i - startDay + 1
    );

    return (
        <div className="w-full">
            {/* Month Nav */}
            <div className="flex items-center justify-between mb-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={prevMonth}
                    className="w-7 h-7 flex items-center justify-center border border-foreground/10 text-foreground/50 hover:border-brand-red hover:text-brand-red transition-all duration-200"
                    aria-label="Previous month"
                >
                    <ChevronUp className="w-3.5 h-3.5 -rotate-90" />
                </motion.button>
                <span className="text-[10px] font-sans font-medium tracking-[0.3em] uppercase text-foreground/80">
                    {MONTHS[view.month]} {view.year}
                </span>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={nextMonth}
                    className="w-7 h-7 flex items-center justify-center border border-foreground/10 text-foreground/50 hover:border-brand-red hover:text-brand-red transition-all duration-200"
                    aria-label="Next month"
                >
                    <ChevronUp className="w-3.5 h-3.5 rotate-90" />
                </motion.button>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                    <div key={d} className="text-center text-[9px] font-sans tracking-[0.15em] uppercase text-foreground/40 py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Day Grid */}
            <div className="grid grid-cols-7 gap-px">
                {cells.map((day, i) =>
                    day === null ? (
                        <div key={i} />
                    ) : (
                        <motion.button
                            key={i}
                            whileTap={!isDisabled(day) ? { scale: 0.85 } : {}}
                            onClick={() => !isDisabled(day) && onSelect(new Date(view.year, view.month, day))}
                            disabled={isDisabled(day)}
                            className={`
                                relative h-8 w-full text-[11px] font-sans font-medium transition-all duration-150
                                ${isDisabled(day)
                                    ? "text-foreground/20 cursor-not-allowed"
                                    : isSelected(day)
                                        ? "bg-brand-red text-white"
                                        : "text-foreground/90 hover:bg-foreground/5 hover:text-foreground"
                                }
                            `}
                        >
                            {day}
                        </motion.button>
                    )
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────── time picker ────────────────────────────── */

interface TimePickerProps {
    hour: number;
    minute: number;
    onHour: (h: number) => void;
    onMinute: (m: number) => void;
}

function TimePicker({ hour, minute, onHour, onMinute }: TimePickerProps) {
    const incH = () => onHour(hour >= 23 ? 0 : hour + 1);
    const decH = () => onHour(hour <= 0 ? 23 : hour - 1);
    const incM = () => onMinute(minute >= 45 ? 0 : minute + 15);
    const decM = () => onMinute(minute <= 0 ? 45 : minute - 15);

    const spinBtn = "w-6 h-6 flex items-center justify-center border border-foreground/10 hover:border-brand-red text-foreground/40 hover:text-brand-red transition-all duration-200";
    const display = "w-14 h-14 border border-foreground/10 flex items-center justify-center bg-foreground/[0.03] my-1";

    return (
        <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex items-start gap-2">
                {/* Hour */}
                <div className="flex flex-col items-center">
                    <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-foreground/50 mb-2">Hour</span>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={incH} className={spinBtn}><ChevronUp className="w-3 h-3" /></motion.button>
                    <motion.div key={hour} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease }} className={display}>
                        <span className="text-xl font-serif text-foreground tabular-nums">{hour.toString().padStart(2, "0")}</span>
                    </motion.div>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={decH} className={spinBtn}><ChevronDown className="w-3 h-3" /></motion.button>
                </div>

                {/* Colon */}
                <div className="flex flex-col items-center mt-8 gap-3 px-1">
                    <span className="w-1 h-1 bg-brand-red block" />
                    <span className="w-1 h-1 bg-brand-red block" />
                </div>

                {/* Minute */}
                <div className="flex flex-col items-center">
                    <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-foreground/50 mb-2">Min</span>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={incM} className={spinBtn}><ChevronUp className="w-3 h-3" /></motion.button>
                    <motion.div key={minute} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease }} className={display}>
                        <span className="text-xl font-serif text-foreground tabular-nums">{minute.toString().padStart(2, "0")}</span>
                    </motion.div>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={decM} className={spinBtn}><ChevronDown className="w-3 h-3" /></motion.button>
                </div>
            </div>

            {/* Period badge */}
            <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-red">
                {hour >= 12 ? "PM" : "AM"}
            </span>
        </div>
    );
}

/* ────────────────────────── confirmation view ──────────────────────────── */

interface ConfirmViewProps {
    date: Date;
    hour: number;
    minute: number;
    name: string;
    onClose: () => void;
}

function ConfirmView({ date, hour, minute, name, onClose }: ConfirmViewProps) {
    return (
        <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center text-center py-8 px-6 gap-6"
        >
            {/* Animated tick mark (brutalist style — a bold check) */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease }}
                className="w-16 h-16 border-2 border-brand-red flex items-center justify-center"
            >
                <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth={2.5}
                    className="w-8 h-8"
                >
                    <motion.polyline
                        points="20 6 9 17 4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    />
                </motion.svg>
            </motion.div>

            <div className="space-y-1">
                <p className="font-serif text-2xl text-foreground">Consultation Secured</p>
                <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-foreground/50">
                    We will be in touch to confirm
                </p>
            </div>

            <div className="w-full border border-foreground/20 divide-y divide-foreground/10">
                <div className="flex items-center gap-3 px-4 py-3">
                    <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="text-xs font-sans text-foreground/70">{formatDate(date)}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3">
                    <Clock className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="text-xs font-sans text-foreground/70">{formatTime(hour, minute)}</span>
                </div>
                {name && (
                    <div className="flex items-center gap-3 px-4 py-3">
                        <span className="text-[10px] font-sans tracking-widest text-brand-red shrink-0">PX</span>
                        <span className="text-xs font-sans text-foreground/70">{name}</span>
                    </div>
                )}
            </div>

            <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="mt-2 text-[10px] font-sans tracking-[0.4em] uppercase text-foreground/50 hover:text-foreground border-b border-transparent hover:border-foreground/30 transition-all duration-300 pb-0.5"
            >
                Close
            </motion.button>
        </motion.div>
    );
}

/* ────────────────────────── main modal component ──────────────────────────── */

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);
    const [name, setName] = useState("");
    const [step, setStep] = useState<"book" | "confirm">("book");
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Scroll lock
    useEffect(() => {
        if (!isOpen) return;
        const y = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${y}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            window.scrollTo(0, y);
        };
    }, [isOpen]);

    // Close on escape
    const handleKey = useCallback(
        (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    const handleSubmit = () => {
        if (!selectedDate) return;
        setStep("confirm");
    };

    const handleClose = () => {
        onClose();
        // Reset after exit animation finishes
        setTimeout(() => {
            setStep("book");
            setSelectedDate(null);
            setName("");
        }, 400);
    };

    if (!mounted) return null;

    const canSubmit = Boolean(selectedDate);

    const modal = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* ── Backdrop ── */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[999] bg-black/40 dark:bg-black/80 backdrop-blur-[2px]"
                        onClick={handleClose}
                        aria-hidden="true"
                    />

                    {/* ── Panel ── */}
                    <motion.div
                        key="panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Book a Consultation"
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.97 }}
                        transition={{ duration: 0.4, ease }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-8 pointer-events-none"
                    >
                        <div
                            className="relative w-full max-w-[780px] pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Accent bar */}
                            <div className="h-[3px] w-full bg-brand-red" />

                            {/* Modal body */}
                            <div className="bg-background border border-foreground/20 border-t-0 w-full shadow-2xl">

                                {/* Header */}
                                <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-foreground/15">
                                    <div>
                                        <p className="text-[9px] font-sans tracking-[0.5em] uppercase text-brand-red mb-2">
                                            — Initiate Dialogue
                                        </p>
                                        <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-none tracking-tight">
                                            {step === "book" ? "Book a Consultation" : "Appointment Confirmed"}
                                        </h2>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={handleClose}
                                        className="w-8 h-8 flex items-center justify-center border border-foreground/10 text-foreground/40 hover:border-brand-red hover:text-brand-red transition-colors duration-200 shrink-0"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                {/* Content */}
                                <AnimatePresence mode="wait">
                                    {step === "confirm" && selectedDate ? (
                                        <ConfirmView
                                            key="confirm"
                                            date={selectedDate}
                                            hour={hour}
                                            minute={minute}
                                            name={name}
                                            onClose={handleClose}
                                        />
                                    ) : (
                                        <motion.div
                                            key="book"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {/* 2-col grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_200px] gap-0">
                                                {/* ── Left: Calendar ── */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -12 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1, duration: 0.4, ease }}
                                                    className="px-6 py-5"
                                                >
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Calendar className="w-3.5 h-3.5 text-brand-red" />
                                                        <span className="text-[9px] font-sans tracking-[0.4em] uppercase text-foreground/70">
                                                            Select Date
                                                        </span>
                                                    </div>
                                                    <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />
                                                    {selectedDate && (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: 4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-3 text-[10px] font-sans tracking-wide text-foreground/50"
                                                        >
                                                            {formatDate(selectedDate)}
                                                        </motion.p>
                                                    )}
                                                </motion.div>

                                                {/* Vertical divider */}
                                                <div className="hidden md:block bg-foreground/10" />

                                                {/* ── Right: Time + Name ── */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 12 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.15, duration: 0.4, ease }}
                                                    className="px-6 py-5 border-t border-foreground/15 md:border-t-0 flex flex-col gap-6"
                                                >
                                                    {/* Time */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Clock className="w-3.5 h-3.5 text-brand-red" />
                                                            <span className="text-[9px] font-sans tracking-[0.4em] uppercase text-foreground/70">
                                                                Select Time
                                                            </span>
                                                        </div>
                                                        <TimePicker
                                                            hour={hour} minute={minute}
                                                            onHour={setHour} onMinute={setMinute}
                                                        />
                                                        <p className="text-center text-[10px] font-sans tracking-[0.2em] text-foreground/50 mt-1">
                                                            {formatTime(hour, minute)}
                                                        </p>
                                                    </div>

                                                    {/* Name */}
                                                    <div>
                                                        <label className="text-[9px] font-sans tracking-[0.4em] uppercase text-foreground/70 block mb-2">
                                                            Your Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="e.g. J. Anderson"
                                                            className="w-full bg-transparent border border-foreground/20 px-3 py-2.5 text-xs font-sans text-foreground/90 placeholder:text-foreground/40 focus:outline-none focus:border-brand-red/60 transition-colors duration-200 tracking-wide"
                                                        />
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* ── Footer ── */}
                                            <div className="flex items-center justify-between px-6 py-4 border-t border-foreground/15">
                                                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-foreground/50">
                                                    {canSubmit
                                                        ? "Ready to confirm"
                                                        : "Select a date to continue"}
                                                </span>
                                                <motion.button
                                                    whileHover={canSubmit ? { x: 3 } : {}}
                                                    whileTap={canSubmit ? { scale: 0.97 } : {}}
                                                    onClick={handleSubmit}
                                                    disabled={!canSubmit}
                                                    className={`
                                                        inline-flex items-center gap-2.5 px-7 py-3 text-[10px] font-sans font-medium tracking-[0.35em] uppercase transition-all duration-300
                                                        ${canSubmit
                                                            ? "bg-brand-red text-white hover:bg-brand-red/90 shadow-[6px_6px_0px_0px_rgba(225,29,72,0.2)]"
                                                            : "bg-foreground/5 text-foreground/20 cursor-not-allowed"
                                                        }
                                                    `}
                                                >
                                                    Secure Meeting
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom corner detail — brutalist flourish */}
                            <div className="absolute -bottom-px left-0 w-8 h-[3px] bg-brand-red/40" />
                            <div className="absolute -bottom-px right-0 w-8 h-[3px] bg-brand-red/40" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(modal, document.body);
}
