import * as schema from "./schema.js";
import { createGetDb } from "@agentnative-fork/core/db";
import { registerShareableResource } from "@agentnative-fork/core/sharing";

export const getDb = createGetDb(schema);
export { schema };

registerShareableResource({
  type: "deck",
  resourceTable: schema.decks,
  sharesTable: schema.deckShares,
  displayName: "Deck",
  titleColumn: "title",
  getResourcePath: (deck) => `/deck/${deck.id}`,
  getDb,
});

registerShareableResource({
  type: "design-system",
  resourceTable: schema.designSystems,
  sharesTable: schema.designSystemShares,
  displayName: "Design System",
  titleColumn: "title",
  getResourcePath: (designSystem) =>
    `/design-systems?designSystemId=${designSystem.id}`,
  getDb,
});
