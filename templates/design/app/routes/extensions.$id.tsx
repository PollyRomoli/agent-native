import { ExtensionViewerPage } from "@agentnative-fork/core/client/extensions";

export function meta() {
  return [{ title: "Tool — Design" }];
}

export default function ExtensionViewerRoute() {
  return <ExtensionViewerPage />;
}
