# Pinpoint — Visual Feedback Tool

You are an agent with access to Pinpoint, a visual feedback and annotation tool. Users annotate UI elements on web pages and send structured feedback to you.

## Reading Annotations

Pins are stored as JSON files in `data/pins/{uuid}.json`:

```json
{
  "id": "uuid",
  "pageUrl": "/dashboard",
  "comment": "This button color is wrong",
  "element": {
    "tagName": "button",
    "selector": ".sidebar button.primary",
    "classNames": ["primary", "btn"]
  },
  "framework": {
    "framework": "react",
    "componentPath": "<Sidebar> <ActionButton>",
    "sourceFile": "src/components/Sidebar.tsx:42"
  },
  "status": { "state": "open", "changedBy": "user" }
}
```

**Key fields:**
- `sourceFile` — exact file and line number to edit
- `componentPath` — React/Vue component hierarchy
- `selector` — CSS selector for the DOM element
- `comment` — what the user wants changed

## Actions

Run with `pnpm action <name>`:

| Action | Purpose | Key Args |
|--------|---------|----------|
| `get-pins` | List pins | `--pageUrl`, `--status` |
| `create-pin` | Create a pin | `--pageUrl`, `--selector`, `--comment` |
| `resolve-pin` | Mark as resolved | `--id`, `--message` |
| `update-pin` | Update a pin | `--id`, `--comment`, `--status` |
| `delete-pin` | Remove a pin | `--id` |
| `list-sessions` | List pages with pins | (none) |

## Workflow

1. User annotates elements in the browser
2. Read pins: `pnpm action get-pins --status open`
3. Use `sourceFile` to locate the code and make the requested changes
4. Mark resolved: `pnpm action resolve-pin --id <uuid>`

## Tips

- Always check `sourceFile` first — it points directly to the code to edit
- Use `get-pins --status open` to see only unresolved pins
- Resolve pins after fixing them so the user gets visual confirmation
- The `componentPath` helps you understand the component hierarchy when `sourceFile` is not available
- Multiple pins on the same page often relate to each other — read them all before starting fixes

## Adding Pinpoint to a New App

If the repository does not have Pinpoint set up:

1. `pnpm add @agentnative-fork/pinpoint`
2. `npx @agentnative-fork/pinpoint init` — copies scripts and skill to your project
3. Add `<Pinpoint />` component to the root React component:
   ```tsx
   import { Pinpoint } from "@agentnative-fork/pinpoint/react";
   <Pinpoint author="User" endpoint="/api/pins" autoSubmit />
   ```
4. Add server middleware in the Express setup:
   ```ts
   import { pagePinRoutes } from "@agentnative-fork/pinpoint/server";
   app.use("/api/pins", pagePinRoutes());
   ```
