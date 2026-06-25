/**
 * Sidebar customization registry.
 *
 * Allows SaaS owners to:
 *  - Register custom header action buttons in the agent panel
 *  - Register custom sidebar bottom-bar items
 *  - Hide built-in sidebar actions (e.g. CLI mode toggle, feedback)
 *
 * All functions are safe to call at module load time. AgentPanel reads
 * the registry at render time.
 */

import type { ComponentType, ReactNode } from "react";

export interface SidebarHeaderAction {
  id: string;
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  /** React component to render instead of a simple button. */
  component?: ComponentType;
  /** Sort order — lower values appear first. Built-in actions use 0-50. */
  order?: number;
}

export interface SidebarNavItem {
  id: string;
  icon?: ReactNode;
  label: string;
  /** React component rendered when this nav item is active. */
  component: ComponentType;
  /** Sort order — lower values appear first. Built-in items use 0-50. */
  order?: number;
}

const _hiddenActions = new Set<string>();
const _customHeaderActions: SidebarHeaderAction[] = [];
const _customNavItems: SidebarNavItem[] = [];

/** Hide a built-in header action by id (e.g. "cli", "feedback", "settings"). */
export function hideSidebarAction(id: string): void {
  _hiddenActions.add(id);
}

/** Show a previously hidden action. */
export function showSidebarAction(id: string): void {
  _hiddenActions.delete(id);
}

/** Check if a header action should be hidden. */
export function isSidebarActionHidden(id: string): boolean {
  return _hiddenActions.has(id);
}

/** Register a custom header action button. */
export function registerSidebarHeaderAction(action: SidebarHeaderAction): void {
  const idx = _customHeaderActions.findIndex((a) => a.id === action.id);
  if (idx >= 0) {
    _customHeaderActions[idx] = action;
  } else {
    _customHeaderActions.push(action);
  }
}

/** Unregister a custom header action. */
export function unregisterSidebarHeaderAction(id: string): void {
  const idx = _customHeaderActions.findIndex((a) => a.id === id);
  if (idx >= 0) _customHeaderActions.splice(idx, 1);
}

/** Get all registered custom header actions, sorted by order. */
export function getCustomSidebarHeaderActions(): SidebarHeaderAction[] {
  return [..._customHeaderActions].sort(
    (a, b) => (a.order ?? 100) - (b.order ?? 100),
  );
}

/** Register a custom sidebar nav item (appears in the mode switcher row). */
export function registerSidebarNavItem(item: SidebarNavItem): void {
  const idx = _customNavItems.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    _customNavItems[idx] = item;
  } else {
    _customNavItems.push(item);
  }
}

/** Unregister a custom sidebar nav item. */
export function unregisterSidebarNavItem(id: string): void {
  const idx = _customNavItems.findIndex((i) => i.id === id);
  if (idx >= 0) _customNavItems.splice(idx, 1);
}

/** Get all registered custom nav items, sorted by order. */
export function getCustomSidebarNavItems(): SidebarNavItem[] {
  return [..._customNavItems].sort(
    (a, b) => (a.order ?? 100) - (b.order ?? 100),
  );
}
