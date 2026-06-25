import { ToolsListPage } from "@agentnative-fork/core/client/tools";

export function meta() {
  return [{ title: "Extensions \u2014 Dispatch" }];
}

export default function ToolsRoute() {
  return <ToolsListPage />;
}
