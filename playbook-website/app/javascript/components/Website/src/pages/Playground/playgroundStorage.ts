import { ROOT_TARGET_ID } from "./types";
import type { BuilderInstance } from "./types";

export type PersistedPlaygroundState = {
  addTargetId: string;
  buildingBlockId: string | null;
  instances: BuilderInstance[];
  selectedId: string | null;
};

const STORAGE_KEY = "playbook-playground-state-v1";

const isBuilderInstance = (value: unknown): value is BuilderInstance => {
  if (!value || typeof value !== "object") return false;
  const instance = value as Partial<BuilderInstance>;

  return (
    typeof instance.id === "string" &&
    typeof instance.kitName === "string" &&
    typeof instance.props === "object" &&
    typeof instance.enabledProps === "object" &&
    Array.isArray(instance.children)
  );
};

const sanitizeInstances = (
  value: unknown,
  validKitNames: Set<string>,
): BuilderInstance[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isBuilderInstance)
    .filter((instance) => validKitNames.has(instance.kitName))
    .map((instance) => ({
      ...instance,
      children: sanitizeInstances(instance.children, validKitNames),
    }));
};

export const loadPersistedPlaygroundState = (
  validKitNames: Set<string>,
): PersistedPlaygroundState | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const instances = sanitizeInstances(parsed?.instances, validKitNames);
    if (instances.length === 0) return null;

    return {
      addTargetId:
        typeof parsed.addTargetId === "string"
          ? parsed.addTargetId
          : ROOT_TARGET_ID,
      buildingBlockId:
        typeof parsed.buildingBlockId === "string"
          ? parsed.buildingBlockId
          : null,
      instances,
      selectedId:
        typeof parsed.selectedId === "string" ? parsed.selectedId : null,
    };
  } catch {
    return null;
  }
};

export const savePersistedPlaygroundState = (
  state: PersistedPlaygroundState,
): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing, quota exceeded, etc.) — skip persistence.
  }
};

export const clearPersistedPlaygroundState = (): void => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
