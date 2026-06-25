import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const workspaceRendererPackages = [
  "@agentnative-fork/code-agents-ui",
  "@agentnative-fork/code-agents-ui/code-agents",
  "@agentnative-fork/core",
  "@agentnative-fork/core/code-agents/transcript-normalizer",
  "@agentnative-fork/core/client",
  "@agentnative-fork/shared-app-config",
];

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin({
        exclude: [
          "@agentnative-fork/code-agents-ui",
          "@agentnative-fork/code-agents-ui/code-agents",
          "@agentnative-fork/shared-app-config",
          "electron-updater",
        ],
      }),
    ],
    resolve: {
      alias: {
        "@shared": resolve("shared"),
      },
    },
  },
  preload: {
    plugins: [
      externalizeDepsPlugin({
        exclude: [
          "@agentnative-fork/code-agents-ui",
          "@agentnative-fork/code-agents-ui/code-agents",
          "@agentnative-fork/shared-app-config",
        ],
      }),
    ],
    resolve: {
      alias: {
        "@shared": resolve("shared"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve("src/preload/index.ts"),
          webview: resolve("src/preload/webview.ts"),
        },
        output: {
          format: "cjs",
          entryFileNames: "[name].js",
          chunkFileNames: "chunks/[name]-[hash].js",
        },
      },
    },
  },
  renderer: {
    optimizeDeps: {
      exclude: workspaceRendererPackages,
    },
    resolve: {
      alias: {
        "@shared": resolve("shared"),
        "@renderer": resolve("src/renderer"),
        react: resolve("node_modules/react"),
        "react-dom": resolve("node_modules/react-dom"),
        "react/jsx-dev-runtime": resolve(
          "node_modules/react/jsx-dev-runtime.js",
        ),
        "react/jsx-runtime": resolve("node_modules/react/jsx-runtime.js"),
      },
      dedupe: ["react", "react-dom"],
    },
    plugins: [react(), tailwindcss({ optimize: false })],
  },
});
