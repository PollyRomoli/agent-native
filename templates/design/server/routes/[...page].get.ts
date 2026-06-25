import { createH3SSRHandler } from "@agentnative-fork/core/server/ssr-handler";

export default createH3SSRHandler(
  () => import("virtual:react-router/server-build"),
);
