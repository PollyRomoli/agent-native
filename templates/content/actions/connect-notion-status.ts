import { defineAction } from "@agentnative-fork/core";
import { getRequestUserEmail } from "@agentnative-fork/core/server";
import { getNotionConnectionForOwner } from "../server/lib/notion.js";
import { z } from "zod";

export default defineAction({
  description: "Check Notion connection status for the current user.",
  schema: z.object({}),
  http: false,
  run: async () => {
    const owner = getRequestUserEmail();
    if (!owner) throw new Error("no authenticated user");
    const connection = await getNotionConnectionForOwner(owner);
    return {
      connected: Boolean(connection),
      workspaceName: connection?.workspaceName ?? null,
      workspaceId: connection?.workspaceId ?? null,
    };
  },
});
