import { defineEventHandler, getCookie, deleteCookie } from "h3";
import { removeSession } from "@agentnative-fork/core/server";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "an_session");
  if (cookie) await removeSession(cookie);
  deleteCookie(event, "an_session", { path: "/" });
  return { ok: true };
});
