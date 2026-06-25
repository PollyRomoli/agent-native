import { useT } from "@agentnative-fork/core/client";
import { DbAdminPage } from "@agentnative-fork/core/client/db-admin";
import { useSetPageTitle } from "@/components/layout/HeaderActions";

export function meta() {
  return [{ title: "Database" }];
}

export default function DatabasePage() {
  const t = useT();
  useSetPageTitle(t("pages.databaseTitle"));
  return (
    <div className="h-full">
      <DbAdminPage />
    </div>
  );
}
