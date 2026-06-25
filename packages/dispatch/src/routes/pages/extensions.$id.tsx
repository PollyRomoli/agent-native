import { ExtensionViewerPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Extension \u2014 Dispatch" }];
}

export default function ExtensionViewerRoute() {
  return <ExtensionViewerPage />;
}
