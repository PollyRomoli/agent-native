/**
 * Loader — applies a SaasConfig to the core framework hooks.
 *
 * Call applySaasConfig(config) at server startup (before autoMountAuth)
 * to wire theme, credentials, models, billing, and UI customizations.
 *
 * Usage:
 *   import { applySaasConfig } from "@agentnative-fork/saas";
 *   import config from "./saas.config.js";
 *   applySaasConfig(config);
 */

import {
  setTheme,
  setCredentialMode,
  setPlatformCredentialResolver,
  registerModelConfig,
  setBillingHooks,
  setBillingMode,
  setCustomPricingResolver,
  hideSettingsSection,
  hideSidebarAction,
} from "@agentnative-fork/core";
import {
  setHiddenTemplates,
  setAllowedTemplates,
} from "@agentnative-fork/shared-app-config";

import type { SaasConfig } from "./schema.js";

export function applySaasConfig(config: SaasConfig): void {
  // Theme
  if (config.theme) {
    setTheme(config.theme);
  }

  // Credentials
  if (config.credentials) {
    setCredentialMode(config.credentials.mode);
    if (config.credentials.platformResolver) {
      setPlatformCredentialResolver(config.credentials.platformResolver);
    }
  }

  // Models
  if (config.models) {
    if (config.models.builder) {
      registerModelConfig("builder", config.models.builder);
    }
    if (config.models.anthropic) {
      registerModelConfig("anthropic", config.models.anthropic);
    }
    if (config.models.aiSdk) {
      for (const [provider, entry] of Object.entries(config.models.aiSdk)) {
        registerModelConfig(`aiSdk:${provider}`, entry);
      }
    }
  }

  // Billing
  if (config.billing) {
    setBillingHooks({
      billingMode: config.billing.mode,
      resolvePricing: config.billing.customPricing as
        | ((model: string) => { input: number; output: number; cacheRead: number; cacheWrite: number } | undefined)
        | undefined,
      calculateCost: config.billing.customCostCalculator,
      convertCostToCredits: config.billing.convertCostToCredits,
    });

    if (config.billing.mode) {
      setBillingMode(config.billing.mode);
    }
  }

  // UI
  if (config.ui) {
    for (const sectionId of config.ui.hiddenSettingsSections ?? []) {
      hideSettingsSection(sectionId);
    }
    for (const actionId of config.ui.hiddenSidebarActions ?? []) {
      hideSidebarAction(actionId);
    }
    // Custom settings sections and sidebar actions require React components
    // which can't be registered from a server-side config file. Those are
    // registered separately from client-side code using the direct registry
    // functions from @agentnative-fork/core.
  }

  // Templates
  if (config.templates) {
    if (config.templates.hiddenTemplateIds) {
      setHiddenTemplates(config.templates.hiddenTemplateIds);
    }
    if (config.templates.allowedTemplateIds) {
      setAllowedTemplates(config.templates.allowedTemplateIds);
    }
  }
}
