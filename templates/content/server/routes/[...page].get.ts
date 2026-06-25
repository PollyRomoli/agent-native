import { getSession } from "@agentnative-fork/core/server";
import { runWithRequestContext } from "@agentnative-fork/core/server/request-context";
import { createH3SSRHandler } from "@agentnative-fork/core/server/ssr-handler";
import { defineEventHandler } from "h3";

const ssr = createH3SSRHandler(
  () => import("virtual:react-router/server-build"),
);

export default defineEventHandler(async (event) => {
  const session = await getSession(event).catch(() => null);
  return runWithRequestContext(
    {
      userEmail: session?.email,
      orgId: session?.orgId,
    },
    async () => ssr(event),
  );
});
