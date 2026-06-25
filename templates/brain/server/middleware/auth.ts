import { defineEventHandler } from "h3";
import { runAuthGuard } from "@agentnative-fork/core/server";

export default defineEventHandler(async (event) => {
  return runAuthGuard(event);
});
