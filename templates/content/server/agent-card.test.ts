import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { generateAgentCard } from "@agentnative-fork/core/a2a";
import { loadActionsFromStaticRegistry } from "@agentnative-fork/core/server";
import { generateActionRegistryForProject } from "@agentnative-fork/core/vite";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const REQUIRED_CONTENT_ACTIONS = [
  "create-document",
  "get-document",
  "list-documents",
  "search-documents",
  "update-document",
  "move-document",
  "navigate",
];

describe("content agent card", () => {
  it("advertises content domain actions from the generated static registry", async () => {
    generateActionRegistryForProject(projectRoot);

    const registryUrl =
      pathToFileURL(path.join(projectRoot, ".generated/actions-registry.ts"))
        .href + `?cacheBust=${Date.now()}`;
    const { default: modules } = await import(registryUrl);
    const actions = loadActionsFromStaticRegistry(modules);
    const card = generateAgentCard(
      {
        name: "Content",
        description: "Agent-native content agent",
        skills: Object.entries(actions).map(([name, entry]) => ({
          id: name,
          name,
          description: entry.tool.description,
        })),
        streaming: true,
      },
      "https://content.agent-native.com",
    );

    expect(card.name).toBe("Content");
    expect(card.description).toBe("Agent-native content agent");
    expect(card.skills.map((skill) => skill.id)).toEqual(
      expect.arrayContaining(REQUIRED_CONTENT_ACTIONS),
    );
  }, 15_000);
});
