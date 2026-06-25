import { defineAction } from "@agentnative-fork/core";
import { z } from "zod";
import { assertAccess } from "@agentnative-fork/core/sharing";
import { deleteEventType } from "../server/event-types-repo.js";

export default defineAction({
  description: "Delete an event type",
  schema: z.object({ id: z.string() }),
  run: async (args) => {
    await assertAccess("event-type", args.id, "admin");
    await deleteEventType(args.id);
    return { ok: true };
  },
});
