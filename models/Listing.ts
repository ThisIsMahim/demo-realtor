import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IListing extends Document {
  title: string;
  price: number;
  location: string;
  propertyType: string;
  status: string;
  images: string[];
}

const ListingSchema: Schema<IListing> = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  propertyType: { type: String, required: true },
  status: { type: String, required: true },
  images: [{ type: String }],
});

// Indexing for performance based on typical filter queries
ListingSchema.index({ propertyType: 1, status: 1 });
ListingSchema.index({ location: 1 });

if (mongoose.models.Listing) {
  delete mongoose.models.Listing;
}
export const Listing: Model<IListing> = mongoose.model<IListing>('Listing', ListingSchema);
