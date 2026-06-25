import {
  createAgentChatPlugin,
  loadActionsFromStaticRegistry,
} from "@agentnative-fork/core/server";
import actionsRegistry from "../../.generated/actions-registry.js";
import { getOrgContext } from "@agentnative-fork/core/org";

const INITIAL_TOOL_NAMES = [
  "view-screen",
  "list-compositions",
  "get-composition",
  "save-composition",
  "update-composition",
  "generate-animated-component",
  "import-code",
  "import-from-url",
  "navigate",
  "list-folders",
  "create-folder",
  "move-composition-to-folder",
];

export default createAgentChatPlugin({
  appId: "videos",
  actions: loadActionsFromStaticRegistry(actionsRegistry),
  initialToolNames: INITIAL_TOOL_NAMES,
  resolveOrgId: async (event) => (await getOrgContext(event)).orgId,
});
