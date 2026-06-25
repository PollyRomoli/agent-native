import { defineAction } from "@agentnative-fork/core";
import { z } from "zod";
import { extractDesignTokensFromUrl } from "@agentnative-fork/core/server/design-token-utils";

export default defineAction({
  description:
    "Analyze a website URL to extract design tokens (colors, fonts, metadata) " +
    "for use in creating or updating a design project. " +
    "Returns extracted CSS variables, font faces, colors, and meta information.",
  schema: z.object({
    url: z.string().describe("Website URL to analyze"),
  }),
  readOnly: true,
  http: { method: "GET" },
  run: async ({ url }) => {
    return extractDesignTokensFromUrl(url);
  },
});
