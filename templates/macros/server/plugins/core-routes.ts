import { createCoreRoutesPlugin } from "@agentnative-fork/core/server";

export default createCoreRoutesPlugin({
  envKeys: [{ key: "ANTHROPIC_API_KEY", label: "Anthropic API Key" }],
});
