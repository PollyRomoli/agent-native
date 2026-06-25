/**
 * Presets — ready-made SaasConfig fragments for common SaaS scenarios.
 *
 * Usage:
 *   import { presets } from "@agentnative-fork/saas";
 *   const config = defineConfig({
 *     ...presets.platformManaged({
 *       appName: "MyAI",
 *       platformResolver: myResolver,
 *     }),
 *   });
 */

import type {
  SaasConfig,
  SaasThemeConfig,
  SaasCredentialConfig,
  SaasBillingConfig,
} from "./schema.js";

// ---------------------------------------------------------------------------
// Theme presets
// ---------------------------------------------------------------------------

export const themePresets = {
  /** Minimal dark theme with purple accent. */
  dark: (): SaasThemeConfig => ({
    appName: "AI",
    colors: {
      primary: "#8B5CF6",
      background: "#0A0A0B",
      foreground: "#FAFAFA",
    },
  }),

  /** Clean light theme with blue accent. */
  light: (): SaasThemeConfig => ({
    appName: "AI",
    colors: {
      primary: "#3B82F6",
      background: "#FFFFFF",
      foreground: "#18181B",
    },
  }),

  /** Warm theme with orange accent. */
  warm: (): SaasThemeConfig => ({
    appName: "AI",
    colors: {
      primary: "#F59E0B",
      background: "#FFFBEB",
      foreground: "#1C1917",
    },
  }),

  /** Enterprise theme with green accent. */
  enterprise: (): SaasThemeConfig => ({
    appName: "AI",
    colors: {
      primary: "#059669",
      background: "#F8FAFC",
      foreground: "#0F172A",
    },
  }),
};

// ---------------------------------------------------------------------------
// Credential presets
// ---------------------------------------------------------------------------

export const credentialPresets = {
  /**
   * Platform-managed credentials — the SaaS owner provides all API keys.
   * Users never see or manage API keys.
   */
  platform: (
    resolver: (key: string) => Promise<string | null>,
  ): SaasCredentialConfig => ({
    mode: "platform",
    platformResolver: resolver,
  }),

  /**
   * Platform with override — platform keys are used by default, but users
   * can bring their own keys to override.
   */
  platformWithOverride: (
    resolver: (key: string) => Promise<string | null>,
  ): SaasCredentialConfig => ({
    mode: "platform-with-override",
    platformResolver: resolver,
  }),

  /** BYOK — users provide their own API keys. Default behavior. */
  byok: (): SaasCredentialConfig => ({
    mode: "byok",
  }),
};

// ---------------------------------------------------------------------------
// Billing presets
// ---------------------------------------------------------------------------

export const billingPresets = {
  /**
   * Credits-based billing — convert dollar costs to credits at a fixed rate.
   */
  credits: (creditsPerDollar: number): SaasBillingConfig => ({
    mode: "credits",
    convertCostToCredits: (cost: number) => Math.ceil(cost * creditsPerDollar),
  }),

  /**
   * Flat-rate billing — no per-token cost tracking shown to users.
   */
  flatRate: (): SaasBillingConfig => ({
    mode: "flat-rate",
  }),

  /**
   * Pass-through billing — track usage but don't display costs.
   */
  passthrough: (): SaasBillingConfig => ({
    mode: "pass-through",
  }),
};

// ---------------------------------------------------------------------------
// Full config presets
// ---------------------------------------------------------------------------

export const presets = {
  /**
   * Platform-managed SaaS: the owner provides API keys, billing is credits-based,
   * API key UI is hidden, and a dark theme is applied.
   */
  platformManaged: (opts: {
    appName: string;
    platformResolver: (key: string) => Promise<string | null>;
    creditsPerDollar?: number;
    theme?: SaasThemeConfig;
  }): SaasConfig => ({
    theme: opts.theme ?? { ...themePresets.dark(), appName: opts.appName },
    credentials: credentialPresets.platform(opts.platformResolver),
    billing: billingPresets.credits(opts.creditsPerDollar ?? 1000),
    ui: {
      hiddenSettingsSections: ["secrets"],
    },
  }),

  /**
   * BYOK SaaS: users bring their own keys, billing is pass-through,
   * and a light theme is applied.
   */
  byok: (opts: {
    appName: string;
    theme?: SaasThemeConfig;
  }): SaasConfig => ({
    theme: opts.theme ?? { ...themePresets.light(), appName: opts.appName },
    credentials: credentialPresets.byok(),
    billing: billingPresets.passthrough(),
  }),
};
