# Phase 4 Research

## 1. Next.js Server Components + Mongoose
Next.js 15 handles external connections internally securely. Inside `app/page.tsx` we can execute:
```ts
await connectToDatabase();
const rawListings = await Listing.find({}).lean();
```
Calling `.lean()` on Mongoose queries converts Mongoose query results into POJOs (Plain Old Javascript Objects) resolving performance constraints avoiding heavy Document hydration internally.

## 2. Serialization Bounds
Passing `rawListings` directly as `initialListings={rawListings}` will trigger mapping errors on `_id` values (Mongoose maps them to an `ObjectId` instance, unable to be parsed through React Server-to-Client networking natively).
- The solution is to explicitly serialize the output (`_id: listing._id.toString()`) inside `page.tsx`.

## 3. Database Seeding Strategy
Since we have `mockListings` locally, we'll write an API endpoint `app/api/seed/route.ts` which imports `mockListings` and `connectToDatabase()`. On triggering `GET /api/seed`, it will wipe the local schema array (`Listing.deleteMany()`) and run `Listing.insertMany(mockListings)`. This bridges the mock structure successfully into our real DB.
