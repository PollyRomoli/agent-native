import { appBasePath } from "@agentnative-fork/core/client";

export function appApiPath(path: string): string {
  if (!path.startsWith("/api/")) return path;
  return `${appBasePath()}${path}`;
}
