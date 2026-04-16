import { IListing } from '../models/Listing';

export const mockListings: Partial<any>[] = [
  {
    _id: "1" as any,
    title: "The Glass Pavilion",
    price: 4500000,
    location: "Gulshan",
    propertyType: "Commercial",
    status: "For Sale",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    _id: "2" as any,
    title: "Concrete Horizon",
    price: 285000,
    location: "Banani",
    propertyType: "Residential",
    status: "For Rent",
    images: ["https://images.unsplash.com/photo-1600607687931-cebf14cd811a?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    _id: "3" as any,
    title: "Timber & Stone Retreat",
    price: 3200000,
    location: "Bashundhara Residential Area",
    propertyType: "Residential",
    status: "For Sale",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    _id: "4" as any,
    title: "Monolithic Estate",
    price: 7800000,
    location: "Gulshan",
    propertyType: "Residential",
    status: "For Sale",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    _id: "5" as any,
    title: "Oceanfront Glasshouse",
    price: 9200000,
    location: "Niketon",
    propertyType: "Industrial",
    status: "For Rent",
    images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1600"]
  },
  {
    _id: "6" as any,
    title: "The Steel Framework",
    price: 1850000,
    location: "Banani",
    propertyType: "Land/Plot",
    status: "For Sale",
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600"]
  }
];
