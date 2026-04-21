import { Suspense } from "react";
import { PropertyBrowser } from "../components/PropertyBrowser";
import { PropertyGridSkeleton } from "../components/Skeletons";
import connectToDatabase from "../lib/mongodb";
import { Listing } from "../models/Listing";

import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { About, Services, Blogs, Contact } from "../components/Sections";

export const dynamic = "force-dynamic";

async function AsyncPropertyBrowser() {
  await connectToDatabase();
  const dbListings = await Listing.find({}).lean();

  const serializedListings = dbListings.map(doc => {
    const raw = doc as any;
    return {
      ...raw,
      _id: raw._id.toString()
    }
  });

  return <PropertyBrowser initialListings={serializedListings} />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-50 relative overflow-x-clip transition-colors duration-300 w-full">
      <div className="w-full max-w-6xl mx-auto px-4 pb-16 flex flex-col gap-24 relative">
        <Hero />

        <div id="properties" className="flex-1 flex flex-col w-full h-full relative z-20">
          <Suspense fallback={<PropertyGridSkeleton />}>
            <AsyncPropertyBrowser />
          </Suspense>
        </div>

        <About id="about" />
        <Services id="services" />
        <Blogs id="blogs" />
        <Contact id="contact" />
      </div>

      <Footer />
    </main>
  );
}
