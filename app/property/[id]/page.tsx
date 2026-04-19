import { PropertyDetailsContent } from "@/components/PropertyDetailsContent";
import connectToDatabase from "@/lib/mongodb";
import { Listing } from "@/models/Listing";

export default async function PropertyStandalonePage({ params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();
    const { id } = await params;

    const dbListing = await Listing.findById(id).lean();
    if (!dbListing) return <div className="p-24 text-center">Property not found.</div>;

    const listing = {
        ...dbListing,
        _id: dbListing._id.toString()
    } as any;

    return (
        <main className="min-h-screen pt-20 bg-background">
            <PropertyDetailsContent listing={listing} />
        </main>
    );
}
