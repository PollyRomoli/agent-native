import { ExtensionViewerPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Tool — Analytics" }];
}

export default function ExtensionViewerRoute() {
  return <ExtensionViewerPage />;
}
