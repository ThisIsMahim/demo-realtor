import { Suspense } from "react";
import { PropertyDetailsDrawer } from "@/components/PropertyDetailsDrawer";
import { PropertyDetailsContent } from "@/components/PropertyDetailsContent";
import { PropertyDetailsSkeleton } from "@/components/Skeletons";
import connectToDatabase from "@/lib/mongodb";
import { Listing } from "@/models/Listing";

async function PropertyData({ id }: { id: string }) {
    await connectToDatabase();
    const dbListing = await Listing.findById(id).lean();
    if (!dbListing) return null;

    const listing = {
        ...dbListing,
        _id: dbListing._id.toString()
    } as any;

    return <PropertyDetailsContent listing={listing} />;
}

export default async function PropertyModalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <PropertyDetailsDrawer>
            <Suspense fallback={<PropertyDetailsSkeleton />}>
                <PropertyData id={id} />
            </Suspense>
        </PropertyDetailsDrawer>
    );
}
