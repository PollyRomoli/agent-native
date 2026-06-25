/**
 * @agentnative-fork/saas — SaaS customization layer for Agent-Native.
 *
 * Exports:
 *  - defineConfig: Declare your SaaS config with type safety and validation.
 *  - applySaasConfig: Apply a config to the core framework hooks at startup.
 *  - Types: SaasConfig and all sub-config interfaces.
 */

export { defineConfig } from "./define-config.js";
export { applySaasConfig } from "./loader.js";
export {
  presets,
  themePresets,
  credentialPresets,
  billingPresets,
} from "./presets.js";
export type {
  SaasConfig,
  SaasThemeConfig,
  SaasCredentialConfig,
  SaasModelCatalogConfig,
  SaasModelCatalogEntry,
  SaasBillingConfig,
  SaasUiConfig,
  SaasTemplateConfig,
} from "./schema.js";
