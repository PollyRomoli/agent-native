import * as schema from "./schema.js";
import { createGetDb } from "@agentnative-fork/core/db";
import { registerShareableResource } from "@agentnative-fork/core/sharing";

export const getDb = createGetDb(schema);
export { schema };

registerShareableResource({
  type: "form",
  resourceTable: schema.forms,
  sharesTable: schema.formShares,
  displayName: "Form",
  titleColumn: "title",
  getResourcePath: (form) => `/forms/${form.id}`,
  getDb,
});
