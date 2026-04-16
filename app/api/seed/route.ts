import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import { Listing } from "../../../models/Listing";

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing
    await Listing.deleteMany({});

    const locations = ["Beverly Hills", "Malibu", "Hollywood Hills", "Bel Air", "Santa Monica", "Dubai", "New York", "London", "Tokyo", "Paris", "Miami"];
    const propertyTypes = ["Mansion", "Villa", "Penthouse", "Estate", "Modern Compound", "Glass House", "Brutalist Base", "Chateau"];
    const statuses = ["Available", "Under Contract", "Sold", "Coming Soon"];
    const images = [
      "/images/listings/brutalist_mansion.png",
      "/images/listings/glass_villa.png",
      "/images/listings/concrete_compound.png",
      "/images/listings/onyx_penthouse.png",
      "/images/listings/clifftop_estate.png"
    ];

    const generateTitle = (type: string, loc: string) => {
        const adjectives = ["The", "Exclusive", "Raw", "Minimalist", "Onyx", "Glass", "Zen", "Grand"];
        return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${type} in ${loc}`;
    };

    const properties = [];

    for (let i = 0; i < 50; i++) {
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const title = generateTitle(type, loc);
        const price = Math.floor(Math.random() * 900) * 10000 + 1000000; // Between 1M and 10M
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Pick 1-3 random images
        const imgs = [];
        const numImgs = Math.floor(Math.random() * 3) + 1;
        for (let j=0; j<numImgs; j++) {
            imgs.push(images[Math.floor(Math.random() * images.length)]);
        }

        properties.push({
            title,
            price,
            location: loc,
            propertyType: type,
            status,
            images: imgs
        });
    }

    await Listing.insertMany(properties);

    return NextResponse.json({ message: "Successfully seeded 50 properties!" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}
