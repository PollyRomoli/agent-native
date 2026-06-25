import { createGetDb } from "@agentnative-fork/core/db";
import * as schema from "./schema.js";

export const getDb = createGetDb(schema);

export function db() {
  return getDb();
}

export { schema };
export * from "./schema.js";
export * from "./migrations.js";
