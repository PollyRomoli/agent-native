import * as schema from "./schema.js";
import { createGetDb } from "@agentnative-fork/core/db";
import { registerShareableResource } from "@agentnative-fork/core/sharing";

export const getDb = createGetDb(schema);
export { schema };

for (const type of ["asset-library", "image-library"] as const) {
  registerShareableResource({
    type,
    resourceTable: schema.assetLibraries,
    sharesTable: schema.assetLibraryShares,
    displayName: "Asset Library",
    titleColumn: "title",
    getResourcePath: (library) => `/brand-kits/${library.id}`,
    getDb,
  });
}
