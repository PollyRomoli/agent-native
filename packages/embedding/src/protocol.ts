// The embedding protocol now lives in @agentnative-fork/core so that standalone
// scaffolds — which depend on the published core but not on this workspace-only
// package — can import the embed surface. This package stays as a thin
// re-export for any consumer that still imports @agentnative-fork/embedding.
export * from "@agentnative-fork/core/embedding/protocol";
