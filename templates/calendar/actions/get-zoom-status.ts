import { defineAction } from "@agentnative-fork/core";
import { getRequestUserEmail } from "@agentnative-fork/core/server";
import { z } from "zod";
import { getZoomStatus } from "../server/lib/zoom.js";

export default defineAction({
  description:
    "Get Zoom OAuth status for the current user. Use before creating Zoom meetings or when helping the user connect Zoom.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const email = getRequestUserEmail();
    return getZoomStatus(email);
  },
});
