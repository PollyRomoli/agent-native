import { useMemo } from "react";
import { ExtensionViewerPage } from "@agentnative-fork/core/client/extensions";
import { useAppHeaderControls } from "@/components/layout/AppLayout";

export default function ExtensionViewerRoute() {
  const controls = useMemo(
    () => ({
      left: (
        <h1 className="text-lg font-semibold tracking-tight truncate">
          Extensions
        </h1>
      ),
    }),
    [],
  );
  useAppHeaderControls(controls);
  return <ExtensionViewerPage />;
}
