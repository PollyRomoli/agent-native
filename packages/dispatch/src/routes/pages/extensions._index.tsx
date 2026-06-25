import { ExtensionsListPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Extensions \u2014 Dispatch" }];
}

export default function ExtensionsRoute() {
  return <ExtensionsListPage />;
}
