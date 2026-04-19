const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://db_user:JmZeBXEsGiBC3iYf@demo-realtor.fifn8hs.mongodb.net/demo_realtor?retryWrites=true&w=majority&appName=demo-realtor";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  propertyType: { type: String, required: true },
  status: { type: String, required: true },
  images: [{ type: String }],
});

const Listing = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");
    
    await Listing.deleteMany({});
    console.log("Cleared old listings");

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

    const generateTitle = (type, loc) => {
        const adjectives = ["The", "Exclusive", "Raw", "Minimalist", "Onyx", "Glass", "Zen", "Grand"];
        return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${type} in ${loc}`;
    };

    const properties = [];

    for (let i = 0; i < 50; i++) {
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const title = generateTitle(type, loc);
        const price = Math.floor(Math.random() * 900) * 10000 + 1000000; 
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        const imgs = [];
        const numImgs = Math.floor(Math.random() * 3) + 1;
        for (let j=0; j<numImgs; j++) {
            imgs.push(images[Math.floor(Math.random() * images.length)]);
        }

        properties.push({ title, price, location: loc, propertyType: type, status, images: imgs });
    }

    await Listing.insertMany(properties);
    console.log("Successfully seeded 50 properties to Atlas!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
