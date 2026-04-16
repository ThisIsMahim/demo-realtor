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
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687930-cebc5a52862a?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518005020251-5fb5c2020251?q=80&w=1600&auto=format&fit=crop"
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
