import { runMigrations } from "@agentnative-fork/core/db";

export default runMigrations([], { table: "docs_migrations" });
