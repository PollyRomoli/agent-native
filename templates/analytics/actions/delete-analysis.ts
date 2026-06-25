import { defineAction } from "@agentnative-fork/core";
import {
  getRequestUserEmail,
  getRequestOrgId,
} from "@agentnative-fork/core/server";
import { z } from "zod";
import { removeAnalysis } from "../server/lib/dashboards-store";

export default defineAction({
  description: "Delete a saved ad-hoc analysis by ID.",
  schema: z.object({
    id: z.string().describe("The analysis ID to delete"),
  }),
  http: { method: "DELETE" },
  run: async (args) => {
    const orgId = getRequestOrgId() || null;
    const email = getRequestUserEmail();
    if (!email) throw new Error("no authenticated user");
    await removeAnalysis(args.id, { email, orgId });
    return { id: args.id, success: true };
  },
});
