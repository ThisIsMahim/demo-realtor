# Phase 4: Database Integration & Hydration

```yaml
wave: 1
depends_on: []
files_modified:
  - app/api/seed/route.ts
  - app/page.tsx
autonomous: true
```

<task>
  <action>Create a NextJS API route inside `app/api/seed/route.ts`. Import `connectToDatabase`, `Listing`, and `mockListings`. Handle a `GET` request executing a connection, waiting on `Listing.deleteMany({})`, then `await Listing.insertMany(mockListings)`. Return cleanly serialized JSON confirming the DB population.</action>
  <read_first>
    - lib/mongodb.ts
    - models/Listing.ts
    - lib/mockListings.ts
  </read_first>
  <acceptance_criteria>
    - API endpoint correctly handles DB reset and mapping functions.
  </acceptance_criteria>
</task>

<task>
  <action>Refactor `app/page.tsx`. Make `Home` an `async` exported component. Wait for `connectToDatabase()`, then fetch `await Listing.find({}).lean()`. Map over the output serializing `_id` and any `Date` objects securely (`_id: dbItem._id.toString()`). Finally, inject that serialized payload mapping into `<PropertyBrowser initialListings={serializedListings} />` over the old static mock mappings.</action>
  <read_first>
    - app/page.tsx
  </read_first>
  <acceptance_criteria>
    - Hardcoded mock implementation replaced globally by Server Action DB fetch parameters.
    - Payload serializations succeed successfully escaping hydration blockades mapping to Client.
  </acceptance_criteria>
</task>
