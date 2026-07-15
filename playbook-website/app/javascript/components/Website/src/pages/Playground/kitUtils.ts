import type { PropValue } from "../KitShow/Tabs/Playground";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";

const EXCLUDED_PROPS = new Set([
  "aria",
  "children",
  "className",
  "data",
  "dark",
  "htmlOptions",
  "id",
  "key",
  "ref",
]);

const CHILD_CAPABLE_KITS = new Set([
  "badge",
  "body",
  "button",
  "card",
  "caption",
  "dialog",
  "flex",
  "flexitem",
  "nav",
  "navitem",
  "popover",
  "title",
  "tooltip",
]);

export const formatKitName = (name: string) => linkFormat(name);

export const displayPropType = (definition?: PropDefinition) =>
  String(definition?.type ?? "string").toLowerCase();

const isReactProp = (definition: PropDefinition) =>
  !definition.platforms ||
  definition.platforms.length === 0 ||
  definition.platforms.includes("react");

export const getAllPropDefinitions = (kit?: PlaygroundKit) => ({
  ...(kit?.kit_schema?.props ?? {}),
  ...(kit?.playground_config?.customProps ?? {}),
});

export const getAllPropDefinitionsWithGlobals = (
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => ({
  ...getAllPropDefinitions(kit),
  ...(kit?.kit_schema?.globalProps ? globalProps ?? {} : {}),
});

export const acceptsChildren = (kit?: PlaygroundKit) => {
  const schemaName = kit?.kit_schema?.name?.toLowerCase();
  return Boolean(
    kit?.playground_config?.children?.editable ||
    (schemaName && CHILD_CAPABLE_KITS.has(schemaName))
  );
};

const getEditableProps = (kit?: PlaygroundKit) => {
  const propDefinitions = getAllPropDefinitions(kit);
  if (Object.keys(propDefinitions).length === 0) return [];

  const hidden = new Set(kit.playground_config?.hiddenProps ?? []);
  const propOrder = new Map<string, number>();
  kit.playground_config?.groups?.forEach((group) => {
    group.props.forEach((name) => {
      if (!propOrder.has(name)) propOrder.set(name, propOrder.size);
    });
  });

  return Object.entries(propDefinitions)
    .filter(([name, definition]) => {
      if (EXCLUDED_PROPS.has(name) || hidden.has(name)) return false;
      return isReactProp(definition);
    })
    .sort(([a], [b]) => {
      const aOrder = propOrder.get(a);
      const bOrder = propOrder.get(b);
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
      return a.localeCompare(b);
    });
};

export const getGroupedEditableProps = (kit?: PlaygroundKit) => {
  const editableProps = getEditableProps(kit);
  const propsByName = new Map(editableProps);
  const assigned = new Set<string>();
  const groups: Array<{ name: string; props: Array<[string, PropDefinition]> }> = [];

  kit?.playground_config?.groups?.forEach((group) => {
    const groupProps = group.props
      .map((name) => {
        const definition = propsByName.get(name);
        if (!definition) return null;
        assigned.add(name);
        return [name, definition] as [string, PropDefinition];
      })
      .filter(Boolean) as Array<[string, PropDefinition]>;

    if (groupProps.length > 0) {
      groups.push({ name: group.name, props: groupProps });
    }
  });

  const otherProps = editableProps.filter(([name]) => !assigned.has(name));
  if (otherProps.length > 0) {
    groups.push({ name: groups.length ? "Other" : "", props: otherProps });
  }

  return groups;
};

export const getGlobalProps = (
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => (kit?.kit_schema?.globalProps ? globalProps ?? {} : {});

const getSchemaDefault = (definition?: PropDefinition) => {
  if (!definition || definition.default === undefined) return undefined;
  const defaultValue = definition.default;
  if (
    defaultValue !== null &&
    typeof defaultValue === "object" &&
    !Array.isArray(defaultValue) &&
    defaultValue.react !== undefined
  ) {
    return defaultValue.react;
  }
  return defaultValue;
};

const getDefaultStructureMode = (kit: PlaygroundKit) =>
  kit.playground_config?.structureModes?.default ?? null;

export const getFirstPreset = (kit: PlaygroundKit) => kit.playground_config?.presets?.[0] ?? null;

export const getInitialDataPresetKey = (kit: PlaygroundKit) => {
  const preset = getFirstPreset(kit);
  return preset?.dataPreset !== undefined ? preset.dataPreset : null;
};

const getInitialStructureMode = (kit: PlaygroundKit) => {
  const preset = getFirstPreset(kit);
  return preset?.structureMode ?? getDefaultStructureMode(kit);
};

export const getStructureModeConfig = (kit?: PlaygroundKit, structureMode?: string | null) =>
  structureMode ? kit?.playground_config?.structureModes?.modes?.[structureMode] : null;

export const getDataPresetProps = (kit?: PlaygroundKit, dataPresetKey?: string | null) => {
  const preset = dataPresetKey
    ? kit?.playground_config?.dataPresets?.presets?.[dataPresetKey]
    : null;
  const props: Record<string, any> = {};

  if (preset?.columnDefinitions) props.columnDefinitions = preset.columnDefinitions;
  if (preset?.tableData) props.tableData = preset.tableData;

  return props;
};

export const getRuntimeProps = (kit?: PlaygroundKit, dataPresetKey?: string | null) => ({
  ...(kit?.playground_config?.requiredProps ?? {}),
  ...getDataPresetProps(kit, dataPresetKey),
});

export const getRequiredCodeProps = (kit?: PlaygroundKit, instance?: BuilderInstance) => {
  const props: Record<string, any> = {
    ...getRuntimeProps(kit, instance?.dataPresetKey),
  };

  kit?.playground_config?.requiredCodeProps?.forEach((name) => {
    const value = instance?.props[name] ?? kit.playground_config?.defaults?.[name];
    if (value !== undefined) props[name] = value;
  });

  return props;
};

export const getStructureModeProps = (kit?: PlaygroundKit, structureMode?: string | null) =>
  getStructureModeConfig(kit, structureMode)?.props ?? {};

export const isRuntimeProp = (
  kit: PlaygroundKit | undefined,
  instance: BuilderInstance | undefined,
  name: string
) => {
  if (!kit || !instance) return false;
  return {
    ...getRequiredCodeProps(kit, instance),
    ...getStructureModeProps(kit, instance.structureMode),
  }[name] !== undefined;
};

export const getConfiguredChildren = (
  kit: PlaygroundKit,
  structureMode: string | null,
  preset = getFirstPreset(kit)
) => {
  if (preset?.children !== undefined) return preset.children;
  const mode = getStructureModeConfig(kit, structureMode);
  if (mode?.children !== undefined) return mode.children;
  return kit.playground_config?.children?.default ?? null;
};

const getInitialInstanceState = (
  kit: PlaygroundKit,
  dataPresetKey: string | null,
  structureMode: string | null,
  globalProps?: Record<string, PropDefinition>
) => {
  const preset = getFirstPreset(kit);
  const explicitProps: Record<string, any> = {
    ...getRuntimeProps(kit, dataPresetKey),
    ...getStructureModeProps(kit, structureMode),
    ...(preset?.props ?? {}),
  };
  const props: Record<string, any> = { ...explicitProps };
  const enabledProps = Object.keys(explicitProps).reduce<Record<string, boolean>>(
    (enabled, name) => {
      enabled[name] = true;
      return enabled;
    },
    {}
  );
  const defaults = kit.playground_config?.defaults ?? {};
  const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);

  Object.entries(propDefinitions).forEach(([name, definition]) => {
    if (props[name] !== undefined) return;
    const value = defaults[name] !== undefined ? defaults[name] : getSchemaDefault(definition);
    if (value !== undefined) props[name] = value;
  });

  return { enabledProps, props };
};

export const createInstance = (
  kit: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
): BuilderInstance => {
  const dataPresetKey = getInitialDataPresetKey(kit);
  const structureMode = getInitialStructureMode(kit);
  const initialState = getInitialInstanceState(kit, dataPresetKey, structureMode, globalProps);

  return {
    id: `${kit.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kitName: kit.name,
    structureMode,
    dataPresetKey,
    configuredChildren: getConfiguredChildren(kit, structureMode),
    props: initialState.props,
    enabledProps: initialState.enabledProps,
    children: [],
  };
};

export const shouldApplySyncValue = (value: any) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return true;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== undefined && value !== null && value !== "";
};

export const getRequiredPropNames = (kit?: PlaygroundKit, instance?: BuilderInstance) => {
  const names = new Set<string>();
  if (!instance) return names;

  Object.keys(getRequiredCodeProps(kit, instance)).forEach((name) => names.add(name));
  Object.keys(getStructureModeProps(kit, instance.structureMode)).forEach((name) => names.add(name));

  return names;
};

export const getPropValue = (
  instance: BuilderInstance,
  kit: PlaygroundKit | undefined,
  name: string
): PropValue => {
  const requiredValue = {
    ...getRequiredCodeProps(kit, instance),
    ...getStructureModeProps(kit, instance.structureMode),
  }[name];

  if (requiredValue !== undefined) {
    return {
      value: instance.props[name] ?? requiredValue,
      enabled: true,
    };
  }

  return {
    value: instance.props[name],
    enabled: Boolean(instance.enabledProps[name]),
  };
};

export const getDataPresetOptions = (kit?: PlaygroundKit) =>
  Object.entries(kit?.playground_config?.dataPresets?.presets ?? {}).map(([key, preset]) => ({
    key,
    label: preset.label ?? key,
  }));

export const getStructureModeOptions = (kit?: PlaygroundKit) =>
  Object.entries(kit?.playground_config?.structureModes?.modes ?? {}).map(([key, mode]) => ({
    key,
    label: mode.label ?? key,
  }));
