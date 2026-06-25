import { runMigrations } from "@agentnative-fork/core/db";
import { dispatchMigrations } from "../../db/migrations.js";

export default runMigrations(dispatchMigrations, {
  table: "dispatch_migrations",
});
