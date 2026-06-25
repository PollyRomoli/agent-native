import { defineAction } from "@agentnative-fork/core";
import { getRequestUserEmail } from "@agentnative-fork/core/server";
import { listNotionLinks } from "../server/lib/notion-sync.js";
import { z } from "zod";

export default defineAction({
  description: "List all documents linked to Notion pages.",
  schema: z.object({}),
  http: false,
  run: async () => {
    const owner = getRequestUserEmail();
    if (!owner) throw new Error("no authenticated user");
    return listNotionLinks(owner);
  },
});
