import { defineAction } from "@agentnative-fork/core";
import { getRequestUserEmail } from "@agentnative-fork/core/server";
import { z } from "zod";
import { putUserSetting, putSetting } from "@agentnative-fork/core/settings";
import type { Settings } from "../shared/api.js";

export default defineAction({
  description: "Update calendar settings",
  schema: z.object({
    timezone: z.string().optional().describe("Timezone"),
    bookingPageTitle: z.string().optional().describe("Booking page title"),
    bookingPageDescription: z
      .string()
      .optional()
      .describe("Booking page description"),
    defaultEventDuration: z.coerce
      .number()
      .int()
      .positive()
      .optional()
      .describe("Default event duration in minutes"),
  }),
  run: async (args) => {
    const email = getRequestUserEmail();
    if (!email) throw new Error("no authenticated user");
    // The frontend sends the full settings object as the body
    const settings = args as unknown as Settings;
    const settingsRecord = settings as unknown as Record<string, unknown>;
    await putUserSetting(email, "calendar-settings", settingsRecord);
    await putSetting("calendar-settings", settingsRecord);
    return settings;
  },
});
