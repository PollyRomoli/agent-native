/**
 * Return the Zoom connection status for the current session user.
 *
 * Shape: { connected: boolean, configured: boolean, accounts: [...] }
 */
import { defineEventHandler, type H3Event } from "h3";
import { getSession } from "@agentnative-fork/core/server";
import { getZoomStatus } from "../../../lib/zoom.js";

export default defineEventHandler(async (event: H3Event) => {
  const session = await getSession(event);
  return getZoomStatus(session?.email ?? null);
});
