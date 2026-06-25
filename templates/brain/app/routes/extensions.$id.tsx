import { ExtensionViewerPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Extension - Brain" }];
}

export default function ExtensionViewerRoute() {
  return <ExtensionViewerPage />;
}
