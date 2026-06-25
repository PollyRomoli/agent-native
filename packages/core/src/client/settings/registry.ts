/**
 * Settings panel section registry.
 *
 * Allows SaaS owners to:
 *  - Hide built-in sections (e.g. hide "secrets" in platform-credential mode)
 *  - Register custom sections with their own React components
 *  - Reorder or replace section labels/icons
 *
 * All functions are safe to call at module load time. The SettingsPanel
 * reads the registry at render time, so changes take effect on the next render.
 */

import type { ComponentType, ReactNode } from "react";

export type SettingsSectionId =
  | "account"
  | "llm"
  | "app-models"
  | "limits"
  | "voice"
  | "demo-mode"
  | "automations"
  | "secrets"
  | "hosting"
  | "database"
  | "uploads"
  | "auth"
  | "email"
  | "browser"
  | "background"
  | "integrations"
  | "usage"
  | "a2a"
  | string; // allow custom section ids

export interface CustomSettingsSection {
  id: string;
  label: string;
  subtitle?: string;
  icon?: ReactNode;
  /** React component rendered inside the section body. */
  component: ComponentType;
  /** Sort order — lower values appear first. Built-in sections use 0-100. */
  order?: number;
}

const _hiddenSections = new Set<string>();
const _customSections: CustomSettingsSection[] = [];
const _sectionLabelOverrides = new Map<string, { label: string; subtitle?: string }>();

/**
 * Hide a built-in settings section by its id.
 * Common use case: hide "secrets" when running in platform-credential mode.
 */
export function hideSettingsSection(id: string): void {
  _hiddenSections.add(id);
}

/** Show a previously hidden section. */
export function showSettingsSection(id: string): void {
  _hiddenSections.delete(id);
}

/** Check if a section should be hidden. */
export function isSettingsSectionHidden(id: string): boolean {
  return _hiddenSections.has(id);
}

/** Register a custom settings section. */
export function registerSettingsSection(section: CustomSettingsSection): void {
  const idx = _customSections.findIndex((s) => s.id === section.id);
  if (idx >= 0) {
    _customSections[idx] = section;
  } else {
    _customSections.push(section);
  }
}

/** Unregister a custom settings section. */
export function unregisterSettingsSection(id: string): void {
  const idx = _customSections.findIndex((s) => s.id === id);
  if (idx >= 0) _customSections.splice(idx, 1);
}

/** Get all registered custom sections, sorted by order. */
export function getCustomSettingsSections(): CustomSettingsSection[] {
  return [..._customSections].sort(
    (a, b) => (a.order ?? 100) - (b.order ?? 100),
  );
}

/** Override the label/subtitle of a built-in section. */
export function overrideSettingsSectionLabel(
  id: string,
  label: string,
  subtitle?: string,
): void {
  _sectionLabelOverrides.set(id, { label, subtitle });
}

/** Get label override for a section, if any. */
export function getSettingsSectionLabelOverride(
  id: string,
): { label: string; subtitle?: string } | undefined {
  return _sectionLabelOverrides.get(id);
}
