import { FloatingNav } from "@/components/FloatingNav";

export function Hero() {
    return (
        <header className="relative w-full h-[500px] lg:h-[740px] flex flex-col items-center">
            {/* Constrained Container for the Dome and Pop-out - Slightly narrower than content */}
            <div className="relative w-full max-w-5xl h-full flex flex-col items-center">

                {/* 1. Pop-Out Building Piece */}
                <div
                    className="absolute inset-x-0 top-0 h-[500px] lg:h-[750px] z-20 pointer-events-none drop-shadow-2xl overflow-hidden"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    <img
                        src="/building-bg-removed.png"
                        alt="Building Pop Out"
                        className="w-full h-full object-cover object-bottom scale-100 opacity-90 dark:opacity-80"
                    />
                </div>

                {/* The Dome Wrapper */}
                <div className="absolute left-0 right-0 bottom-0 top-[100px] lg:top-[150px] rounded-t-[100px] lg:rounded-t-[150px] overflow-hidden bg-white dark:bg-[#111] shadow-md dark:shadow-none flex flex-col items-center border-t border-x border-zinc-200 dark:border-zinc-800">
                    {/* 2. Hero Background */}
                    <img
                        src="/building-with-bg.jpg"
                        alt="Hero Background"
                        className="absolute left-0 -top-[100px] lg:-top-[150px] w-full h-[500px] lg:h-[750px] object-cover object-bottom z-0 opacity-40 dark:opacity-20 pointer-events-none"
                    />

                    {/* 3. Hero Sharp Layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                        <img
                            src="/building-bg-removed.png"
                            alt="Building Sharp"
                            className="absolute left-0 -top-[100px] lg:-top-[150px] w-full h-[500px] lg:h-[750px] object-cover object-bottom opacity-90 dark:opacity-80"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-50 dark:to-[#0A0A0A] z-0" />

                    {/* FloatingNav is now in layout.tsx */}

                    {/* Hero Content */}
                    <div className="relative z-30 text-center px-6 max-w-4xl mx-auto mt-auto mb-16 md:mb-44">
                        <h1 className="font-serif text-4xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] text-zinc-900 dark:text-zinc-50 mb-8 opacity-0 animate-[fade-in-up_1s_ease-out_0.2s_forwards] drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            Simplifying<br />Buying A Home
                        </h1>
                        <p className="text-zinc-800 dark:text-zinc-100 tracking-[0.3em] font-sans uppercase text-[10px] md:text-xs max-w-xl mx-auto opacity-0 animate-[fade-in-up_1s_ease-out_0.6s_forwards] px-4 font-bold bg-white/10 dark:bg-black/10 backdrop-blur-sm py-1 rounded-full">
                            Luxury Brutalist estates and minimal architectural masterpieces.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
