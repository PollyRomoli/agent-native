import { createCoreRoutesPlugin } from "@agentnative-fork/core/server";
import { envKeys } from "../lib/env-config.js";

export default createCoreRoutesPlugin({ envKeys });
