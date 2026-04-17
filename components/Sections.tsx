"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About({ id }: { id: string }) {
    return (
        <section id={id} className="py-32 md:py-48 px-6 md:px-12 w-full relative z-20 overflow-hidden bg-background">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 w-full"
                >
                    <div className="w-full aspect-[4/5] bg-foreground/5 relative rounded-none border border-foreground/10 overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.02)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent dark:from-black/90" />
                        <Image
                            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1600&auto=format&fit=crop"
                            alt="Architecture Detail"
                            fill
                            className="object-cover mix-blend-luminosity opacity-40 hover:opacity-100 transition-opacity duration-1000"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-2 block">— 01. Ethos</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1"
                >
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-12 leading-[0.9] tracking-tighter">
                        Redefining<br />
                        <span className="text-foreground/30 dark:text-foreground/40 italic">Space.</span>
                    </h2>
                    <p className="text-foreground/60 font-sans tracking-wide leading-relaxed text-sm md:text-base max-w-xl pl-8 border-l border-foreground/20">
                        We curate architectural masterpieces where raw brutalism meets quiet luxury.
                        Every estate in our portfolio challenges the ordinary, designed for those who appreciate
                        form, function, and absolute uncompromising vision.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export function Services({ id }: { id: string }) {
    const services = [
        { num: "01", title: "Acquisition", desc: "Sourcing off-market, brutalist and modern architectural masterpieces exclusively for discerning clientele." },
        { num: "02", title: "Consultation", desc: "Collaborating with elite interior architects to tailor the raw aesthetics to your personal identity." },
        { num: "03", title: "Marketing", desc: "Designing cinematic, gallery-level showcases for your property to attract high-net-worth buyers globally." }
    ];

    return (
        <section id={id} className="py-32 md:py-48 bg-foreground/5 dark:bg-architecture-dark w-full relative z-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-baseline justify-between mb-24 border-b border-foreground/10 pb-8"
                >
                    <h2 className="font-serif text-3xl md:text-5xl text-foreground">Expertise</h2>
                    <span className="text-xs font-sans tracking-[0.2em] text-foreground/40 uppercase">What we do</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground/10">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={`p-10 md:p-16 relative group overflow-hidden ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-foreground/10' : ''}`}
                        >
                            <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <span className="text-5xl md:text-7xl font-serif text-foreground/10 block mb-12 group-hover:text-brand-red/20 transition-colors duration-500">
                                {service.num}
                            </span>
                            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6 leading-tight group-hover:tracking-wider transition-all duration-500">
                                {service.title}
                            </h3>
                            <p className="text-foreground/50 font-sans text-xs md:text-sm tracking-wide leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Blogs({ id }: { id: string }) {
    const blogs = [
        { title: "The Return of Raw Concrete in Residential Design", date: "24 OCT 2026", type: "Editorial", image: "https://images.unsplash.com/photo-1518005020251-5fb5c2020251?q=80&w=1600&auto=format&fit=crop" },
        { title: "Minimalism as a Luxury Statement", date: "12 SEP 2026", type: "Perspective", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop" }
    ];

    return (
        <section id={id} className="py-32 md:py-48 px-6 md:px-12 max-w-6xl mx-auto w-full relative z-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <h2 className="font-serif text-5xl md:text-7xl text-foreground leading-none tracking-tighter">
                    Journal
                </h2>
                <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-foreground/60 hover:text-brand-red border-b border-foreground/20 hover:border-brand-red transition-colors pb-1">
                    View All Editions
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                {blogs.map((blog, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="group cursor-pointer block"
                    >
                        <div className="w-full aspect-[16/10] bg-foreground/5 mb-8 overflow-hidden relative border border-foreground/20 rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.02)]">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover mix-blend-luminosity opacity-40 dark:opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-brand-red/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        </div>
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-sans text-foreground/40 mb-4 border-t border-foreground/10 pt-4">
                            <span>{blog.date}</span>
                            <span>{blog.type}</span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/90 group-hover:text-brand-red transition-colors leading-[1.2]">
                            {blog.title}
                        </h3>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export function Contact({ id }: { id: string }) {
    return (
        <section id={id} className="w-full relative z-20 border-t border-foreground/10 bg-background">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="max-w-6xl mx-auto px-6 md:px-12 py-32 md:py-64 text-center relative"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] font-sans text-foreground/40 mb-12 block">
                    Initiate Dialogue
                </span>

                <h2 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-foreground leading-none tracking-tighter mb-16 hover:italic transition-all duration-700 cursor-default">
                    Connect.
                </h2>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-brand-red text-white px-12 py-5 text-xs font-sans font-medium tracking-[0.3em] uppercase transition-all duration-300 hover:bg-brand-red/90 shadow-[8px_8px_0px_0px_rgba(225,29,72,0.2)] rounded-none"
                >
                    Secure Consultation
                </motion.button>
            </motion.div>
        </section>
    );
}
