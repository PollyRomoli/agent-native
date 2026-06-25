/**
 * @agentnative-fork/dispatch — workspace control plane for agent-native apps.
 *
 * Most consumers import from one of the subpaths instead of this top-level
 * entry, since each subpath has different runtime needs (server vs client):
 *
 *   import { dispatchRoutes } from "@agentnative-fork/dispatch/routes";
 *   import { setupDispatch } from "@agentnative-fork/dispatch/server";
 *   import { dispatchSchema, dispatchMigrations } from "@agentnative-fork/dispatch/db";
 *
 * The top-level export only re-exports the universal config types so callers
 * can write `DispatchConfig` once and reuse across server/client modules.
 */

export type {
  DispatchConfig,
  DispatchAuthConfig,
  DispatchIntegrationsConfig,
} from "./config.js";
