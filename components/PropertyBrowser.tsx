"use client";

import { useState, useMemo, useEffect } from 'react';
import { IListing } from '../models/Listing';
import { BentoGrid } from './BentoGrid';

interface PropertyBrowserProps {
    initialListings: Partial<IListing>[];
}

export function PropertyBrowser({ initialListings }: PropertyBrowserProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const [activePropertyType, setActivePropertyType] = useState<string | null>(null);
    const [activeStatus, setActiveStatus] = useState<string | null>(null);

    const locations = useMemo(() => {
        const list = new Set(initialListings.map((l) => l.location).filter(Boolean));
        return Array.from(list);
    }, [initialListings]);

    const propertyTypes = useMemo(() => {
        const list = new Set(initialListings.map((l) => l.propertyType).filter(Boolean));
        return Array.from(list);
    }, [initialListings]);

    const statuses = useMemo(() => {
        const list = new Set(initialListings.map((l) => l.status).filter(Boolean));
        return Array.from(list);
    }, [initialListings]);

    const filteredListings = useMemo(() => {
        return initialListings.filter(listing => {
            let match = true;
            if (activeLocation && listing.location !== activeLocation) match = false;
            if (activePropertyType && listing.propertyType !== activePropertyType) match = false;
            if (activeStatus && listing.status !== activeStatus) match = false;
            return match;
        });
    }, [initialListings, activeLocation, activePropertyType, activeStatus]);

    const clearFilters = () => {
        setActiveLocation(null);
        setActivePropertyType(null);
        setActiveStatus(null);
    };

    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    return (
        <div className="w-full flex flex-col relative -mt-16 sm:-mt-20 md:-mt-24 z-30">
            {/* Themed Filter Bar - "Architectural Slab" Design */}
            <div className="sticky top-4 z-[60] w-full px-4 transition-all duration-500 ease-in-out flex justify-center mb-8">
                <div className="flex flex-row items-center bg-white/80 dark:bg-[#050505]/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl max-w-5xl rounded-full py-2 px-4 border-brand-red/20 shadow-brand-red/5">

                    <div className="flex-1 flex flex-row items-center divide-x divide-zinc-200 dark:divide-zinc-800 min-w-max md:min-w-0">
                        {/* Property Type Dropdown */}
                        <div className="relative flex-1 group min-w-[100px] md:min-w-0">
                            <div className="flex flex-row items-center justify-between px-3 md:px-6 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-500 py-1 rounded-full" onClick={() => { setIsPropertyTypeOpen(!isPropertyTypeOpen); setIsLocationOpen(false); setIsStatusOpen(false); }}>
                                <div className="flex flex-col">
                                    <span className="text-zinc-900 dark:text-zinc-50 font-medium tracking-tight transition-all duration-500 text-[9px] md:text-xs">
                                        {activePropertyType || 'All Estates'}
                                    </span>
                                </div>
                                <svg className={`w-2.5 h-2.5 md:w-3 md:h-3 text-zinc-400 dark:text-zinc-600 transition-transform duration-500 ml-2 ${isPropertyTypeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                            </div>

                            {isPropertyTypeOpen && (
                                <div className="absolute top-[calc(100%+12px)] left-0 w-full min-w-[180px] md:min-w-[220px] bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-3xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="p-1.5">
                                        <button
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-all text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900"
                                            onClick={() => { setActivePropertyType(null); setIsPropertyTypeOpen(false); }}
                                        >
                                            Show All
                                        </button>
                                        {propertyTypes.map(type => (
                                            <button
                                                key={`type-${type}`}
                                                className={`w-full text-left px-4 py-2.5 rounded-lg text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-all mt-0.5 ${activePropertyType === type ? 'bg-brand-red text-white' : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900'}`}
                                                onClick={() => { setActivePropertyType(String(type)); setIsPropertyTypeOpen(false); }}
                                            >
                                                {String(type)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status Dropdown */}
                        <div className="relative flex-1 group min-w-[100px] md:min-w-0">
                            <div className="flex flex-row items-center justify-between px-3 md:px-6 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-500 py-1" onClick={() => { setIsStatusOpen(!isStatusOpen); setIsLocationOpen(false); setIsPropertyTypeOpen(false); }}>
                                <div className="flex flex-col">
                                    <span className="text-zinc-900 dark:text-zinc-50 font-medium tracking-tight transition-all duration-500 text-[9px] md:text-xs leading-tight max-w-[60px] md:max-w-[80px]">
                                        {activeStatus || 'Listing Status'}
                                    </span>
                                </div>
                                <svg className={`w-2.5 h-2.5 md:w-3 md:h-3 text-zinc-400 dark:text-zinc-600 transition-transform duration-500 ml-2 ${isStatusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                            </div>

                            {isStatusOpen && (
                                <div className="absolute top-[calc(100%+12px)] left-0 w-full min-w-[180px] md:min-w-[220px] bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-3xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="p-1.5">
                                        <button
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-all text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900"
                                            onClick={() => { setActiveStatus(null); setIsStatusOpen(false); }}
                                        >
                                            Every Status
                                        </button>
                                        {statuses.map(stat => (
                                            <button
                                                key={`stat-${stat}`}
                                                className={`w-full text-left px-4 py-2.5 rounded-lg text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-all mt-0.5 ${activeStatus === stat ? 'bg-brand-red text-white' : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900'}`}
                                                onClick={() => { setActiveStatus(String(stat)); setIsStatusOpen(false); }}
                                            >
                                                {String(stat)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Location Dropdown */}
                        <div className="relative flex-1 group min-w-[120px] md:min-w-0">
                            <div className="flex flex-row items-center justify-between px-3 md:px-6 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all duration-500 py-1" onClick={() => { setIsLocationOpen(!isLocationOpen); setIsPropertyTypeOpen(false); setIsStatusOpen(false); }}>
                                <div className="flex flex-col">
                                    <span className="text-zinc-900 dark:text-zinc-50 font-medium tracking-tight transition-all duration-500 truncate max-w-[70px] md:max-w-[150px] text-[9px] md:text-xs">
                                        {activeLocation || 'Global Selection'}
                                    </span>
                                </div>
                                <svg className={`w-2.5 h-2.5 md:w-3 md:h-3 text-zinc-400 dark:text-zinc-600 transition-transform duration-500 ml-2 ${isLocationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                            </div>

                            {isLocationOpen && (
                                <div className="absolute top-[calc(100%+12px)] right-0 md:left-0 w-full min-w-[200px] md:min-w-[250px] bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-3xl z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="p-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                                        <button
                                            className="w-full text-left px-4 py-2.5 rounded-lg text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-all text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900"
                                            onClick={() => { setActiveLocation(null); setIsLocationOpen(false); }}
                                        >
                                            All Locations
                                        </button>
                                        {locations.map(area => (
                                            <button
                                                key={`area-${area}`}
                                                className={`w-full text-left px-4 py-2.5 rounded-lg text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-bold transition-all mt-0.5 ${activeLocation === area ? 'bg-brand-red text-white' : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-900'}`}
                                                onClick={() => { setActiveLocation(String(area)); setIsLocationOpen(false); }}
                                            >
                                                {String(area)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-3 md:px-4 transition-all duration-500 py-0.5">
                        <button
                            onClick={clearFilters}
                            className="w-auto md:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg uppercase tracking-[0.2em] font-bold hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-all duration-300 shadow-sm px-3 md:px-4 py-1 text-[7px]"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>


            <div className="flex-1 w-full relative">
                {/* Invisible overlay to close dropdowns... */}
                {(isPropertyTypeOpen || isLocationOpen || isStatusOpen) && (
                    <div className="fixed inset-0 z-30" onClick={() => { setIsPropertyTypeOpen(false); setIsLocationOpen(false); setIsStatusOpen(false); }}></div>
                )}
                <div className="relative z-10 px-6 md:px-12">
                    <BentoGrid listings={filteredListings} />
                </div>

                {filteredListings.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-20 opacity-0 animate-[fade-in-up_1s_ease-out_forwards] z-20">
                        <p className="font-serif text-3xl text-foreground/50 mb-4 text-center">No estates match your vision.</p>
                        <button onClick={clearFilters} className="text-xs uppercase tracking-widest text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors">
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
