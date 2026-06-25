import * as schema from "./schema.js";
import { createGetDb } from "@agentnative-fork/core/db";
import { registerShareableResource } from "@agentnative-fork/core/sharing";

export const getDb = createGetDb(schema);
export { schema };

registerShareableResource({
  type: "booking-link",
  resourceTable: schema.bookingLinks,
  sharesTable: schema.bookingLinkShares,
  displayName: "Booking link",
  titleColumn: "title",
  getResourcePath: (bookingLink) => `/booking-links/${bookingLink.id}`,
  getDb,
});
