import type { EnvKeyConfig } from "@agentnative-fork/core/server";

export const envKeys: EnvKeyConfig[] = [
  { key: "DATABASE_URL", label: "Database URL", required: false },
  { key: "DATABASE_AUTH_TOKEN", label: "Database Auth Token", required: false },
  {
    key: "TURNSTILE_SECRET_KEY",
    label: "Turnstile Secret Key",
    required: false,
  },
  {
    key: "VITE_TURNSTILE_SITE_KEY",
    label: "Turnstile Site Key",
    required: false,
  },
  { key: "GEMINI_API_KEY", label: "Gemini AI", required: false },
];
