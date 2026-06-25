import { defineAction } from "@agentnative-fork/core";
import { z } from "zod";
import { assertAccess } from "@agentnative-fork/core/sharing";
import {
  updateEventType,
  getEventTypeById,
} from "../server/event-types-repo.js";

export default defineAction({
  description: "Toggle hidden (unpublished) state on an event type",
  schema: z.object({ id: z.string(), hidden: z.boolean().optional() }),
  run: async (args) => {
    await assertAccess("event-type", args.id, "editor");
    const current = await getEventTypeById(args.id);
    if (!current) throw new Error("Event type not found");
    const target = args.hidden ?? !current.hidden;
    return {
      eventType: await updateEventType(args.id, { hidden: target }),
    };
  },
});
