import { defineAction } from "@agentnative-fork/core";
import { z } from "zod";
import { assertAccess } from "@agentnative-fork/core/sharing";
import { updateEventType } from "../server/event-types-repo.js";

export default defineAction({
  description: "Reorder event types by passing the desired id order",
  schema: z.object({ ids: z.array(z.string()) }),
  run: async (args) => {
    for (let i = 0; i < args.ids.length; i++) {
      await assertAccess("event-type", args.ids[i], "editor");
    }
    for (let i = 0; i < args.ids.length; i++) {
      await updateEventType(args.ids[i], { position: i });
    }
    return { ok: true };
  },
});
