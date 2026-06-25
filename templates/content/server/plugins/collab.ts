import { createCollabPlugin } from "@agentnative-fork/core/server";

export default createCollabPlugin({
  table: "documents",
  contentColumn: "content",
  idColumn: "id",
  autoSeed: false, // Seeding happens via edit-document action, not on startup
  resourceType: "document",
});
