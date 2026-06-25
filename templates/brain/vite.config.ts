import { reactRouter } from "@react-router/dev/vite";
import { agentNative } from "@agentnative-fork/core/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), agentNative()],
});
