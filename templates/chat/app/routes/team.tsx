import { TeamPage } from "@agentnative-fork/core/client/org";
import { useT } from "@agentnative-fork/core/client";
import { useSetPageTitle } from "@/components/layout/HeaderActions";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [{ title: `Team — ${APP_TITLE}` }];
}

export default function TeamRoute() {
  const t = useT();
  useSetPageTitle(t("pages.teamTitle"));
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <TeamPage createOrgDescription={t("pages.teamCreateOrgDescription")} />
    </main>
  );
}
