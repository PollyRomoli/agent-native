import { defineAction } from "@agentnative-fork/core";
import { getRequestUserEmail } from "@agentnative-fork/core/server";
import { getUserSetting } from "@agentnative-fork/core/settings";
import { z } from "zod";
import type { Settings } from "../shared/api.js";

const DEFAULT_SETTINGS: Settings = {
  timezone: "America/New_York",
  bookingPageTitle: "Book a Meeting",
  bookingPageDescription: "Select a time that works for you.",
  defaultEventDuration: 30,
};

export default defineAction({
  description: "Get calendar settings",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const email = getRequestUserEmail();
    if (!email) throw new Error("no authenticated user");
    const settings =
      (await getUserSetting(email, "calendar-settings")) || DEFAULT_SETTINGS;
    return settings;
  },
});
