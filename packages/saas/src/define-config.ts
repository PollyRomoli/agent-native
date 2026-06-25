/**
 * defineConfig — the main entry point for SaaS owners to declare their config.
 *
 * Usage:
 *   // saas.config.ts
 *   import { defineConfig } from "@agentnative-fork/saas";
 *
 *   export default defineConfig({
 *     theme: { appName: "MyApp", logoUrl: "/logo.png" },
 *     credentials: { mode: "platform" },
 *     ui: { hiddenSettingsSections: ["secrets"] },
 *   });
 *
 * The returned object is a plain SaasConfig — defineConfig is primarily a
 * type-guard and validation helper. The loader (applySaasConfig) reads it
 * and wires it into the core framework hooks.
 */

import type { SaasConfig } from "./schema.js";

export function defineConfig(config: SaasConfig): SaasConfig {
  validateConfig(config);
  return config;
}

function validateConfig(config: SaasConfig): void {
  if (config.credentials?.mode) {
    const validModes = ["byok", "platform", "platform-with-override"];
    if (!validModes.includes(config.credentials.mode)) {
      throw new Error(
        `Invalid credential mode "${config.credentials.mode}". Valid modes: ${validModes.join(", ")}`,
      );
    }
  }

  if (config.theme) {
    const theme = config.theme as Record<string, unknown>;
    if (theme.appName !== undefined && typeof theme.appName !== "string") {
      throw new Error("theme.appName must be a string");
    }
  }

  if (config.ui?.hiddenSettingsSections) {
    if (!Array.isArray(config.ui.hiddenSettingsSections)) {
      throw new Error("ui.hiddenSettingsSections must be an array of strings");
    }
  }

  if (config.ui?.hiddenSidebarActions) {
    if (!Array.isArray(config.ui.hiddenSidebarActions)) {
      throw new Error("ui.hiddenSidebarActions must be an array of strings");
    }
  }

  if (config.templates?.allowedTemplateIds && config.templates?.hiddenTemplateIds) {
    throw new Error(
      "templates.allowedTemplateIds and templates.hiddenTemplateIds are mutually exclusive",
    );
  }
}
