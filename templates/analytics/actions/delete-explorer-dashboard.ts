import { defineAction } from "@agentnative-fork/core";
import {
  getRequestUserEmail,
  getRequestOrgId,
} from "@agentnative-fork/core/server";
import { z } from "zod";
import { removeDashboard } from "../server/lib/dashboards-store";

export default defineAction({
  description:
    "Permanently delete an explorer (BigQuery explorer) dashboard by ID. This cannot be undone — " +
    "use archive-dashboard instead when the dashboard might be needed later.",
  schema: z.object({
    id: z.string().describe("The explorer dashboard ID to delete"),
  }),
  http: { method: "DELETE" },
  run: async (args) => {
    const email = getRequestUserEmail();
    if (!email) throw new Error("no authenticated user");
    const orgId = getRequestOrgId() || null;
    await removeDashboard(args.id, { email, orgId });
    return { id: args.id, success: true };
  },
});
