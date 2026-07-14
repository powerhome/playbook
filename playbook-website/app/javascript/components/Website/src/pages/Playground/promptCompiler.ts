import {
  acceptsChildren,
  createInstance,
  displayPropType,
  getAllPropDefinitionsWithGlobals,
  getConfiguredChildren,
  getDataPresetOptions,
  getRuntimeProps,
  getStructureModeOptions,
  getStructureModeProps,
} from "./kitUtils";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";

export type PromptBuilderPlanItem = {
  kitName?: string;
  structureMode?: string | null;
  dataPresetKey?: string | null;
  props?: Record<string, unknown>;
  children?: PromptBuilderPlanItem[];
  configuredChildren?: string | null;
};

export type PromptBuilderPlan = {
  mode?: "replace" | "append" | "modify";
  summary?: string;
  instances?: PromptBuilderPlanItem[];
};

export type CompilePromptPlanResult = {
  diagnostics: string[];
  instances: BuilderInstance[];
};

const MAX_PROMPT_INSTANCES = 40;

const normalizeKitName = (name: string) =>
  name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();

const resolveAvailableKitName = (
  name: string,
  kitsByName: Record<string, PlaygroundKit>
) => {
  const normalized = normalizeKitName(name);
  if (kitsByName[normalized]) return normalized;

  const withoutPrefix = normalized.replace(/^pb_/, "");
  if (kitsByName[withoutPrefix]) return withoutPrefix;

  return normalized;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const coerceValueForPropDefinition = (
  value: unknown,
  definition?: PropDefinition
): { ok: boolean; value?: unknown } => {
  const type = displayPropType(definition);
  const enumValues = definition?.values ?? [];

  if (enumValues.length > 0) {
    if (typeof value !== "string") return { ok: false };
    const match = enumValues.find(
      (option) => option.toLowerCase() === value.toLowerCase()
    );
    return match ? { ok: true, value: match } : { ok: false };
  }

  if (type.includes("boolean")) {
    if (typeof value === "boolean") return { ok: true, value };
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (normalized === "true") return { ok: true, value: true };
      if (normalized === "false") return { ok: true, value: false };
    }
    return { ok: false };
  }

  if (
    type.includes("number") ||
    type.includes("numeric") ||
    type.includes("integer")
  ) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return { ok: true, value };
    }
    if (typeof value === "string" && value.trim() !== "") {
      const numericValue = Number(value);
      if (Number.isFinite(numericValue)) return { ok: true, value: numericValue };
    }
    return { ok: false };
  }

  if (type.includes("array")) {
    return Array.isArray(value) ? { ok: true, value } : { ok: false };
  }

  if (type.includes("hash") || type.includes("object")) {
    return isPlainObject(value) ? { ok: true, value } : { ok: false };
  }

  if (type.includes("function") || type.includes("=>")) {
    return typeof value === "string" && value.trim()
      ? { ok: true, value }
      : { ok: false };
  }

  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return { ok: true, value };
  }

  return { ok: false };
};

const compilePlanItemToBuilderInstance = (
  planItem: PromptBuilderPlanItem,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>,
  diagnostics: string[] = [],
  compiledKitCount = { value: 0 }
): BuilderInstance | null => {
  if (compiledKitCount.value >= MAX_PROMPT_INSTANCES) {
    diagnostics.push(`Skipped extra kits after the ${MAX_PROMPT_INSTANCES} kit limit.`);
    return null;
  }

  const rawKitName =
    typeof planItem.kitName === "string" ? planItem.kitName : "";
  const kitName = resolveAvailableKitName(rawKitName, kitsByName);
  const kit = kitsByName[kitName];

  if (!kit) {
    diagnostics.push(`Skipped unknown kit "${rawKitName || "unnamed"}".`);
    return null;
  }

  compiledKitCount.value += 1;
  const instance = createInstance(kit, globalProps);

  const structureModeOptions = new Set(
    getStructureModeOptions(kit).map((option) => option.key)
  );
  const requestedStructureMode =
    typeof planItem.structureMode === "string" ? planItem.structureMode : null;
  const structureMode =
    requestedStructureMode && structureModeOptions.has(requestedStructureMode)
      ? requestedStructureMode
      : instance.structureMode;

  if (requestedStructureMode && !structureMode) {
    diagnostics.push(
      `Ignored unavailable structure mode "${requestedStructureMode}" on ${kit.label}.`
    );
  }

  const dataPresetOptions = new Set(
    getDataPresetOptions(kit).map((option) => option.key)
  );
  const requestedDataPresetKey =
    typeof planItem.dataPresetKey === "string"
      ? planItem.dataPresetKey
      : null;
  const dataPresetKey =
    requestedDataPresetKey && dataPresetOptions.has(requestedDataPresetKey)
      ? requestedDataPresetKey
      : instance.dataPresetKey;

  if (requestedDataPresetKey && !dataPresetKey) {
    diagnostics.push(
      `Ignored unavailable data preset "${requestedDataPresetKey}" on ${kit.label}.`
    );
  }

  const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);
  const runtimeProps = {
    ...getRuntimeProps(kit, dataPresetKey),
    ...getStructureModeProps(kit, structureMode),
  };

  const nextInstance: BuilderInstance = {
    ...instance,
    structureMode,
    dataPresetKey,
    configuredChildren:
      typeof planItem.configuredChildren === "string"
        ? planItem.configuredChildren
        : getConfiguredChildren(kit, structureMode, null),
    props: {
      ...instance.props,
      ...runtimeProps,
    },
    enabledProps: {
      ...instance.enabledProps,
      ...Object.keys(runtimeProps).reduce<Record<string, boolean>>(
        (enabled, name) => {
          enabled[name] = true;
          return enabled;
        },
        {}
      ),
    },
    children: [],
  };

  Object.entries(planItem.props ?? {}).forEach(([name, value]) => {
    const definition = propDefinitions[name];

    if (!definition && runtimeProps[name] === undefined) {
      diagnostics.push(`Ignored unknown prop "${name}" on ${kit.label}.`);
      return;
    }

    const coerced = coerceValueForPropDefinition(value, definition);
    if (!coerced.ok) {
      diagnostics.push(`Ignored invalid value for "${name}" on ${kit.label}.`);
      return;
    }

    nextInstance.props[name] = coerced.value;
    nextInstance.enabledProps[name] = true;
  });

  const childItems = Array.isArray(planItem.children) ? planItem.children : [];

  if (childItems.length > 0 && !acceptsChildren(kit)) {
    diagnostics.push(`Skipped children inside ${kit.label}; that kit cannot contain kits.`);
    return nextInstance;
  }

  nextInstance.children = childItems
    .map((child) =>
      compilePlanItemToBuilderInstance(
        child,
        kitsByName,
        globalProps,
        diagnostics,
        compiledKitCount
      )
    )
    .filter(Boolean) as BuilderInstance[];

  return nextInstance;
};

export const compilePromptPlan = (
  plan: PromptBuilderPlan,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
): CompilePromptPlanResult => {
  const diagnostics: string[] = [];
  const compiledKitCount = { value: 0 };
  const requestedItems = Array.isArray(plan.instances) ? plan.instances : [];

  const instances = requestedItems
    .map((planItem) =>
      compilePlanItemToBuilderInstance(
        planItem,
        kitsByName,
        globalProps,
        diagnostics,
        compiledKitCount
      )
    )
    .filter(Boolean) as BuilderInstance[];

  if (requestedItems.length > 0 && instances.length === 0) {
    diagnostics.push("The prompt did not produce any usable Playbook kits.");
  }

  return { diagnostics, instances };
};

export const getPromptPlanMode = (plan: PromptBuilderPlan) =>
  plan.mode === "append" || plan.mode === "modify" ? plan.mode : "replace";
