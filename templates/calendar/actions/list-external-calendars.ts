import { defineAction } from "@agentnative-fork/core";
import { getRequestUserEmail } from "@agentnative-fork/core/server";
import { getUserSetting } from "@agentnative-fork/core/settings";
import { z } from "zod";
import type { ExternalCalendar } from "../shared/api.js";

export default defineAction({
  description: "List all subscribed external calendar feeds (ICS/webcal URLs)",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const email = getRequestUserEmail();
    if (!email) throw new Error("no authenticated user");
    const calendars = (await getUserSetting(
      email,
      "external-calendars",
    )) as unknown as ExternalCalendar[] | null;
    return calendars ?? [];
  },
});
