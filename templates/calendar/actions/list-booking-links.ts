import { defineAction } from "@agentnative-fork/core";
import { desc } from "drizzle-orm";
import { accessFilter } from "@agentnative-fork/core/sharing";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { rowToBookingLink } from "../server/lib/booking-link-utils.js";

export default defineAction({
  description: "List all booking links",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const rows = await getDb()
      .select()
      .from(schema.bookingLinks)
      .where(accessFilter(schema.bookingLinks, schema.bookingLinkShares))
      .orderBy(desc(schema.bookingLinks.updatedAt));
    return rows.map(rowToBookingLink);
  },
});
