import { PropertyDetailsDrawer } from "@/components/PropertyDetailsDrawer";

export default function Loading() {
    return (
        <PropertyDetailsDrawer>
            <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-architecture-slate">
                <div className="w-12 h-12 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin"></div>
                <p className="mt-4 text-xs tracking-widest font-sans uppercase text-black/50 dark:text-white/50">Loading Details</p>
            </div>
        </PropertyDetailsDrawer>
    );
}
