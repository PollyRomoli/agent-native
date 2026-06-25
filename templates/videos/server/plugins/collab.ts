import { createCollabPlugin } from "@agentnative-fork/core/server";

export default createCollabPlugin({
  table: "compositions",
  contentColumn: "data",
  idColumn: "id",
  autoSeed: true,
  resourceType: "composition",
  resolveResourceId: (docId) =>
    docId.startsWith("comp-") ? docId.slice("comp-".length) : docId,
});
