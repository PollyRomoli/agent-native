import { ExtensionViewerPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Extension - Assets" }];
}

export default function ExtensionViewerRoute() {
  return <ExtensionViewerPage />;
}
