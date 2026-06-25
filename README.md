# Agent-Native

> **Fork modifications**: This fork adds a **SaaS customization layer** (`@agentnative-fork/saas` package) that enables white-labeling, platform-managed credentials, custom billing, and UI overrides. All packages are published under the `@agentnative-fork` scope. See [SaaS Customization Layer](#saas-customization-layer) below for details.

## The framework for agent-native apps

Agent-Native is an open-source framework for building robust agents that act inside real apps, not just chat next to them. It gives you primitives for product-grade agentic software: shared actions, SQL-backed state, identity, tools, skills, jobs, observability, and UI surfaces that all work together. Bring your own database, hosting provider, model stack, and app code.

```ts
// One action powers UI, agent, HTTP, MCP, A2A, and CLI.
export default defineAction({
  schema: z.object({
    emailId: z.string(),
    body: z.string(),
  }),
  run: async ({ emailId, body }) => {
    await db.insert(replies).values({ emailId, body });
  },
});
```

- **Actions**: Define work once. Use it from UI, agent, API, MCP, A2A, and CLI.
- **Agent runtime**: Chat, tools, skills, memory, jobs, observability, and handoffs ship together.
- **Backend agnostic**: Plug in any Drizzle-supported SQL database and Nitro-compatible host.

## Templates

Start with a full featured template. Each one is a complete, 100% free and open-source SaaS app: cloneable, not scaffolded, except you own the code and can customize everything.

<table>
<tr>
<td width="33%" align="center" valign="top">

**Clips**

<a href="https://agent-native.com/templates/clips"><img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F189ebd9b2f2b4f0ead3b33138d4e4c10?format=webp&width=800" alt="Clips template" width="100%" /></a>

**Agent-Native Loom + Jam**

Record your screen with auto-transcripts and captured browser debug logs, share a link, and let an agent read the transcript, see timestamped frames, and fix the bug.

</td>
<td width="33%" align="center" valign="top">

**Plans**

<a href="https://agent-native.com/templates/plan"><img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fb6f4213ac7cc42eeb10c12e8ccda8936?format=webp&width=800" alt="Plans template" width="100%" /></a>

**Visual plan mode for coding agents**

Install `/visual-plan` and `/visual-recap` so your coding agent can plan before it builds and recap changes after they land. High-level code reviews with diagrams, wireframes, annotations, and review links.

</td>
<td width="33%" align="center" valign="top">

**Design**

<a href="https://agent-native.com/templates/design"><img src="https://cdn.builder.io/api/v1/image/assets%2F348da13fcd8b414c87de9066196f7266%2F961bedb713a94463b834c1f2f4643bcf?format=webp&width=800" alt="Design template" width="100%" /></a>

**Agent-Native design prototyping**

Generate interactive HTML prototypes, compare variants, refine controls, and export the result.

</td>
</tr>
<tr>
<td width="33%" align="center" valign="top">

**Content**

<a href="https://agent-native.com/templates/content"><img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F89bcfc6106304bfbaf8ec8a7ccd721eb?format=webp&width=800" alt="Content template" width="100%" /></a>

**Open-source Obsidian for MDX**

Edit local Markdown/MDX files, generate rich interactive custom blocks, and draft, rewrite, or publish with an agent.

</td>
<td width="33%" align="center" valign="top">

**Slides**

<a href="https://agent-native.com/templates/slides"><img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2c09b451d40c4a74a89a38d69170c2d8?format=webp&width=800" alt="Slides template" width="100%" /></a>

**Agent-Native Google Slides, Pitch**

Generate and edit React-based presentations via prompt or point-and-click.

</td>
<td width="33%" align="center" valign="top">

**Analytics**

<a href="https://agent-native.com/templates/analytics"><img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F4933a80cc3134d7e874631f688be828a?format=webp&width=800" alt="Analytics template" width="100%" /></a>

**Agent-Native Amplitude, Mixpanel**

Connect analytics data sources, prompt for real charts, and build reusable dashboards.

</td>
</tr>
</table>

View the full template gallery at **[agent-native.com/templates](https://agent-native.com/templates)**.

## Agents and UIs, Fully Connected

The agent and the UI are equal citizens of one system. Every action works both ways: click it or ask for it.

![Agents and UIs fully connected](https://cdn.builder.io/api/v1/file/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fadc1e9e9368e4a8cb1b4dbb5aae5aaa2)

- **Everything syncs**: One database, one state. Changes from either side show up instantly on the other.
- **Real-time multiplayer**: Humans and agents edit the same document together, with the agent as a first-class peer.
- **Context-aware**: The agent knows what you're looking at. Select text, hit Cmd+I, and tell it what to do.
- **Agents call agents**: Tag another agent from any app and they coordinate over A2A.
- **Self-improving**: The agent can add features, fix bugs, and refine the UI over time.

## Try it with a skill

Don't want to scaffold a whole app yet? Add visual planning and PR recaps to Claude Code, Codex, Cursor, Pi, OpenCode, GitHub Copilot / VS Code, and similar agents with one command:

```bash
npx @agentnative-fork/core@latest skills add visual-plan
```

![Visual plan and recap in action](https://raw.githubusercontent.com/builderio/skills/main/media/visual-recap.gif)

You get two slash commands:

- **`/visual-plan`**: before the agent writes code, it opens a structured, reviewable plan with inline diagrams, UI wireframes, file-by-file implementation maps, and annotations you can comment on and approve.
- **`/visual-recap`**: after changes land, it turns a PR or git diff into a high-altitude visual recap with a shareable review link instead of a raw diff.

See the **[Skills Guide](https://agent-native.com/docs/skills-guide#app-backed-skills)** for more.

## Quick Start

One command to start a new project locally.

```bash
npx @agentnative-fork/core@latest create my-app
cd my-app
pnpm install
pnpm dev
```

`create` first asks how you want to start:

- **Full template(s)**: clone one or more complete apps into a workspace. Pick Mail + Calendar + Forms and you get all three wired up and sharing auth.
- **Chat**: a single app with a minimal chat UI and the browser shell already wired, the simplest way to get a UI.
- **Headless**: a single action-first app with no UI shell. The CLI walks you through calling your first action and agent, and you can add a UI later.

Prefer flags? `create my-app --template mail`, `--headless`, or `--standalone` skip the prompt.

## The Best of Both Worlds

|                   | SaaS Tools         | Raw AI Agents           | Internal Tools             | Agent-Native            |
| ----------------- | ------------------ | ----------------------- | -------------------------- | ----------------------- |
| **UI**            | Polished but rigid | None                    | Mixed quality              | Full UI, fork & go      |
| **AI**            | Bolted on          | Powerful                | Shallowly connected        | Agent-first, integrated |
| **Customization** | Can't              | Instructions and skills | Full, but high maintenance | Agent modifies the app  |
| **Ownership**     | Rented             | Somewhat yours          | You own the code           | You own the code        |

## SaaS Customization Layer

This fork adds a `@agentnative-fork/saas` package and extensibility hooks throughout `@agentnative-fork/core` for white-labeling and SaaS deployment.

### What's new

| Feature | Description |
| ------- | ----------- |
| **Theme injection** | Override app name, logo, colors, fonts, and legal links on the login page and onboarding HTML |
| **Credential modes** | `byok` (default), `platform` (owner provides all API keys), or `platform-with-override` (platform keys with user override) |
| **Model catalog overrides** | Register custom model configs for Builder, Anthropic, or AI SDK providers |
| **Billing hooks** | Custom pricing resolvers, cost calculators, and credits conversion for usage-based billing |
| **Settings panel customization** | Hide built-in sections, register custom sections, override section labels |
| **Sidebar customization** | Hide built-in header actions/nav items, register custom header actions and nav items |
| **Template registry override** | Hide or restrict which templates appear in pickers |
| **Auto-hide API key UI** | Secrets section automatically hidden when credential mode is `platform` |

### Installation

#### Option 1 — Clone the full monorepo (recommended)

All packages resolve locally via pnpm workspaces. Best for personal use and customization.

```bash
git clone https://github.com/PollyRomoli/agent-native.git
cd agent-native
pnpm install
pnpm dev
```

The `@agentnative-fork/saas` package is automatically linked as a workspace dependency. No npm or external registry required.

#### Option 2 — Install into an existing project from GitHub

If you already have a project and just want the SaaS layer, install directly from this GitHub repo. No npm account needed.

```bash
pnpm add https://github.com/PollyRomoli/agent-native.git#packages/saas
```

> **Note**: This installs only the `@agentnative-fork/saas` package. It depends on `@agentnative-fork/core` and `@agentnative-fork/shared-app-config` which also need to be installed from this fork since they contain hooks not in the upstream npm package:
>
> ```bash
> pnpm add https://github.com/PollyRomoli/agent-native.git#packages/core
> pnpm add https://github.com/PollyRomoli/agent-native.git#packages/shared-app-config
> ```

Then in your server entry:

```ts
import { applySaasConfig } from "@agentnative-fork/saas";
import config from "./saas.config.js";

applySaasConfig(config);
```

#### Option 3 — Install from npm (optional, for public distribution)

If you want to publish to npm for wider distribution, all three packages are scoped under `@agentnative-fork`. After setting up the npm org and trusted publishing (see `.github/workflows/auto-publish.yml`), users can install with:

```bash
pnpm add @agentnative-fork/saas @agentnative-fork/core @agentnative-fork/shared-app-config
```

This option requires npm setup but is not needed for personal use or GitHub-based installation.

### Usage

Create a `saas.config.ts` in your app:

```ts
import { defineConfig, presets } from "@agentnative-fork/saas";

export default defineConfig(
  presets.platformManaged({
    appName: "MyAI",
    platformResolver: async (key) => {
      // Return platform-managed API keys
      return process.env[key] ?? null;
    },
    creditsPerDollar: 1000,
  }),
);
```

Apply it at server startup:

```ts
import { applySaasConfig } from "@agentnative-fork/saas";
import config from "./saas.config.js";

applySaasConfig(config);
```

### Modified files

**`packages/core/src/`**:
- `server/onboarding-html.ts` — `ThemeConfig` interface, `setTheme`/`getTheme`, theme-aware HTML generation
- `server/auth.ts` — `theme` property in `AuthOptions`, theme-aware login HTML
- `server/credential-provider.ts` — `CredentialMode` type, `setCredentialMode`/`getCredentialMode`, platform credential resolver
- `server/builder-browser.ts` — `credentialMode` in `BuilderBrowserStatus`
- `agent/model-config.ts` — `registerModelConfig`/`getModelConfig`, mutable model registry
- `agent/default-model.ts` — Re-exports new model registry functions
- `usage/store.ts` — `BillingHooks` interface, `setBillingHooks`/`setBillingMode`/`setCustomPricingResolver`
- `client/settings/registry.ts` — **New**: settings section registry (hide/show/register/label override)
- `client/settings/SettingsPanel.tsx` — Conditional rendering via registry, auto-hide secrets in platform mode
- `client/settings/useBuilderStatus.ts` — `credentialMode` in `BuilderStatus`
- `client/sidebar-registry.ts` — **New**: sidebar action/nav item registry
- `client/AgentPanel.tsx` — Conditional rendering of sidebar actions via registry
- `server/index.ts`, `client/index.ts`, `index.ts` — Exports for new functions and types

**`packages/shared-app-config/`**:
- `templates.ts` — `setHiddenTemplates`/`setAllowedTemplates`/`isTemplateVisible`/`visibleTemplatesWithOverrides`

**`packages/saas/`** — **New package**:
- `package.json`, `tsconfig.json`
- `src/schema.ts` — `SaasConfig` and sub-config interfaces
- `src/define-config.ts` — `defineConfig()` with validation
- `src/loader.ts` — `applySaasConfig()` wiring config to core hooks
- `src/presets.ts` — Ready-made theme, credential, billing, and composite presets
- `src/index.ts` — Public API exports

## Community

Join the **[Discord](https://discord.gg/qm82StQ2NC)** to ask questions, share what you're building, and get help.

## Docs

Full documentation at **[agent-native.com](https://agent-native.com)**.

## License

MIT
