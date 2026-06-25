import { defineAction } from "@agentnative-fork/core";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { assertAccess } from "@agentnative-fork/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { getAssetOrThrow } from "./_helpers.js";

export default defineAction({
  description: "Delete an asset row. Requires editor access to its library.",
  schema: z.object({ id: z.string() }),
  run: async ({ id }) => {
    const asset = await getAssetOrThrow(id);
    await assertAccess("asset-library", asset.libraryId, "editor");
    await getDb().delete(schema.assets).where(eq(schema.assets.id, id));
    return { id, deleted: true };
  },
});
