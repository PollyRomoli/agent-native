import { ExtensionsListPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Extensions — Design" }];
}

export default function ExtensionsRoute() {
  return <ExtensionsListPage />;
}
