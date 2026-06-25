/**
 * @agentnative-fork/scheduling
 *
 * Root entry — re-exports shared types and constants only.
 * Subpath imports are the primary API surface:
 *
 *   import { eventTypes, bookings } from "@agentnative-fork/scheduling/schema";
 *   import { computeAvailableSlots } from "@agentnative-fork/scheduling/core";
 *   import { useSlots } from "@agentnative-fork/scheduling/react";
 */

export * from "./shared/index.js";
export { MANIFEST } from "./manifest.js";
export { VERSION } from "./version.js";
