import type { AppConfig } from "@agentnative-fork/shared-app-config";

/** Mobile app only ever shows production URLs — no localhost on phones. */
export function getAppUrl(app: AppConfig): string {
  return app.url;
}
