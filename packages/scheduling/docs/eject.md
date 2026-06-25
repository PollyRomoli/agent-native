# Ejecting `@agentnative-fork/scheduling`

For full customization, you can move the package source into your own repo.

**Planned for v0.2:** `agent-native eject @agentnative-fork/scheduling`.

**Today (v0.1)** — do it manually:

1. `cp -r node_modules/@agentnative-fork/scheduling/src packages/scheduling-local/src`
2. Add `packages/scheduling-local/` to your workspaces.
3. Replace `"@agentnative-fork/scheduling": "^0.1"` in dependencies with
   `"@local/scheduling": "workspace:*"` (or similar).
4. Run a find/replace across your repo from `@agentnative-fork/scheduling` to
   `@local/scheduling`.
5. Install: `pnpm install`.

Now you own the code and can modify freely. Upstream updates are available via
`npm view @agentnative-fork/scheduling versions` — you can selectively port changes.
