import { PropertyDetailsDrawer } from "@/components/PropertyDetailsDrawer";
import { PropertyDetailsContent } from "@/components/PropertyDetailsContent";
import connectToDatabase from "@/lib/mongodb";
import { Listing } from "@/models/Listing";

export default async function PropertyModalPage({ params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();
    const { id } = await params;

    const dbListing = await Listing.findById(id).lean();
    if (!dbListing) return null;

    const listing = {
        ...dbListing,
        _id: dbListing._id.toString()
    } as any;

    return (
        <PropertyDetailsDrawer>
            <PropertyDetailsContent listing={listing} />
        </PropertyDetailsDrawer>
    );
}
