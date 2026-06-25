import { createGetDb } from "@agentnative-fork/core/db";
import { schema } from "@agentnative-fork/dispatch/db";

export const getDb = createGetDb(schema);

export { schema };
