import * as schema from "./schema.js";
import { createGetDb } from "@agentnative-fork/core/db";
import { registerShareableResource } from "@agentnative-fork/core/sharing";

export const getDb = createGetDb(schema);
export { schema };

registerShareableResource({
  type: "document",
  resourceTable: schema.documents,
  sharesTable: schema.documentShares,
  displayName: "Document",
  titleColumn: "title",
  getResourcePath: (document) => `/page/${document.id}`,
  getDb,
});
