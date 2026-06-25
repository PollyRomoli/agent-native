/**
 * SaaS configuration schema for @agentnative-fork/saas.
 *
 * This is the single source of truth for what a SaaS owner can configure.
 * The defineConfig() function returns a validated SaasConfig object,
 * and the loader applies it to the core framework hooks.
 */

import type { CredentialMode } from "@agentnative-fork/core";
import type { UsageBillingMode } from "@agentnative-fork/core";
import type { ThemeConfig } from "@agentnative-fork/core";

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export interface SaasThemeConfig extends ThemeConfig {}

// ---------------------------------------------------------------------------
// Credentials
// ---------------------------------------------------------------------------

export interface SaasCredentialConfig {
  /** How API keys are resolved: user-supplied, platform-managed, or platform with user override. */
  mode: CredentialMode;
  /** Platform credential resolver — receives a key name, returns the secret value or null. */
  platformResolver?: (key: string) => Promise<string | null>;
}

// ---------------------------------------------------------------------------
// Models
// ---------------------------------------------------------------------------

export interface SaasModelCatalogEntry {
  defaultModel: string;
  supportedModels: string[];
}

export interface SaasModelCatalogConfig {
  /** Override the builder engine model catalog. */
  builder?: SaasModelCatalogEntry;
  /** Override the anthropic engine model catalog. */
  anthropic?: SaasModelCatalogEntry;
  /** Override aiSdk sub-provider catalogs. Key is the provider name (e.g. "openai", "google"). */
  aiSdk?: Record<string, SaasModelCatalogEntry>;
}

// ---------------------------------------------------------------------------
// Billing
// ---------------------------------------------------------------------------

export interface SaasBillingConfig {
  /** Custom billing mode (unit, label, source). */
  mode?: UsageBillingMode;
  /** Custom pricing resolver — receives model id, returns pricing or undefined to fall back. */
  customPricing?: (model: string) => unknown | undefined;
  /** Custom cost calculator. */
  customCostCalculator?: (
    inputTokens: number,
    outputTokens: number,
    model: string,
    cacheReadTokens: number,
    cacheWriteTokens: number,
  ) => number | undefined;
  /** Convert cost in cents to display credits/units. */
  convertCostToCredits?: (cents: number) => number;
}

// ---------------------------------------------------------------------------
// UI Customization
// ---------------------------------------------------------------------------

export interface SaasUiConfig {
  /** Hide specific settings sections by id (e.g. "secrets", "usage"). */
  hiddenSettingsSections?: string[];
  /** Hide specific sidebar actions by id (e.g. "cli", "resources"). */
  hiddenSidebarActions?: string[];
  /** Custom settings section registrations. */
  customSettingsSections?: Array<{
    id: string;
    label: string;
    subtitle?: string;
    order?: number;
  }>;
  /** Custom sidebar header action registrations. */
  customSidebarActions?: Array<{
    id: string;
    label: string;
    order?: number;
  }>;
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

export interface SaasTemplateConfig {
  /** Override the list of visible template IDs. When set, only these templates appear in the catalog. */
  allowedTemplateIds?: string[];
  /** Hide specific template IDs from the catalog. */
  hiddenTemplateIds?: string[];
}

// ---------------------------------------------------------------------------
// Full config
// ---------------------------------------------------------------------------

export interface SaasConfig {
  theme?: SaasThemeConfig;
  credentials?: SaasCredentialConfig;
  models?: SaasModelCatalogConfig;
  billing?: SaasBillingConfig;
  ui?: SaasUiConfig;
  templates?: SaasTemplateConfig;
}
