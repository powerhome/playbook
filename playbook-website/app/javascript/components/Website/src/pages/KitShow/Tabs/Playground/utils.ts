import {
  PropValue,
  PropCondition,
  PlaygroundConfig,
  PropDefinition,
} from "./types";

/** Resolve React default from kit schema (handles `{ react, rails }` merge shape). */
export function resolveSchemaDefault(def?: PropDefinition): unknown {
  if (!def || def.default === undefined) return undefined;
  const d = def.default as Record<string, unknown> | unknown;
  if (
    d !== null &&
    typeof d === "object" &&
    !Array.isArray(d) &&
    "react" in d &&
    (d as Record<string, unknown>).react !== undefined
  ) {
    return (d as Record<string, unknown>).react;
  }
  return def.default;
}

/** Example value for object/array prop dialogs — prefers playground config defaults over schema. */
export function getPlaygroundPropExampleValue(
  name: string,
  definition: PropDefinition,
  displayPropValue: PropValue | undefined,
  playgroundConfig?: PlaygroundConfig | null,
): unknown {
  if (playgroundConfig?.defaults?.[name] !== undefined) {
    return playgroundConfig.defaults[name];
  }

  if (
    displayPropValue?.value !== undefined &&
    displayPropValue.value !== null &&
    displayPropValue.value !== ""
  ) {
    const v = displayPropValue.value;
    if (typeof v === "object") {
      if (Array.isArray(v) && v.length > 0) return v;
      if (
        !Array.isArray(v) &&
        Object.keys(v as Record<string, unknown>).length > 0
      ) {
        return v;
      }
    } else {
      return v;
    }
  }

  return resolveSchemaDefault(definition);
}

export type PropGroup = {
  name: string;
  props: Array<[string, PropDefinition]>;
};

/** Group prop definitions by named sections; unassigned props land in `otherGroupName`. */
export function groupPropDefinitions(
  propDefinitions: Record<string, PropDefinition>,
  groups: Array<{ name: string; props: string[] }>,
  otherGroupName = "Other",
): PropGroup[] {
  const result: PropGroup[] = [];
  const assignedProps = new Set<string>();

  groups.forEach((group) => {
    const groupProps: Array<[string, PropDefinition]> = [];
    group.props.forEach((propName) => {
      if (propDefinitions[propName]) {
        groupProps.push([propName, propDefinitions[propName]]);
        assignedProps.add(propName);
      }
    });
    if (groupProps.length > 0) {
      result.push({ name: group.name, props: groupProps });
    }
  });

  const otherProps = Object.entries(propDefinitions).filter(
    ([name]) => !assignedProps.has(name),
  );
  if (otherProps.length > 0) {
    result.push({ name: otherGroupName, props: otherProps });
  }

  return result;
}

/**
 * Fill missing optional props with `{ value: default, enabled: false }` from
 * `playgroundConfig.defaults` and schema `default`, so controls can reflect
 * implicit defaults (especially booleans) without counting as "explicit" until toggled.
 */
export const mergeImplicitDefaultPropValues = (
  values: Record<string, PropValue>,
  playgroundConfig: PlaygroundConfig | null | undefined,
  propDefinitions: Record<string, PropDefinition>
): Record<string, PropValue> => {
  const out = { ...values };
  const configDefaults = playgroundConfig?.defaults ?? {};
  for (const name of Object.keys(propDefinitions)) {
    if (out[name] !== undefined) continue;
    const fromConfig = configDefaults[name];
    const fromSchema = resolveSchemaDefault(propDefinitions[name]);
    const defaultVal =
      fromConfig !== undefined ? fromConfig : fromSchema;
    if (defaultVal === undefined) continue;
    out[name] = { value: defaultVal, enabled: false };
  }
  return out;
};

/**
 * Merge required props, optional data preset (columnDefinitions + tableData),
 * structure mode defaults, and a feature preset into one prop map.
 */
export const buildPlaygroundPropValues = (
  playgroundConfig: PlaygroundConfig | null | undefined,
  requiredProps: Record<string, any>,
  dataPresetKey: string | null,
  structureModeKey: string | null,
  presetIndex: number | null
): Record<string, PropValue> => {
  const baseLayer: Record<string, any> = { ...requiredProps };
  if (dataPresetKey && playgroundConfig?.dataPresets?.presets?.[dataPresetKey]) {
    const pack = playgroundConfig.dataPresets.presets[dataPresetKey];
    baseLayer.columnDefinitions = pack.columnDefinitions;
    baseLayer.tableData = pack.tableData;
  }

  const values: Record<string, PropValue> = {};
  Object.entries(baseLayer).forEach(([name, value]) => {
    values[name] = { value, enabled: true };
  });

  const mode = structureModeKey
    ? playgroundConfig?.structureModes?.modes[structureModeKey]
    : null;
  if (mode?.props) {
    Object.entries(mode.props).forEach(([name, value]) => {
      values[name] = { value, enabled: true };
    });
  }

  const preset =
    presetIndex != null && playgroundConfig?.presets?.[presetIndex]
      ? playgroundConfig.presets[presetIndex]
      : null;
  if (preset?.props) {
    Object.entries(preset.props).forEach(([name, value]) => {
      values[name] = { value, enabled: true };
    });
  }

  return values;
};

/** Resolve columnDefinitions + tableData for the current required + optional data preset (shared with sync logic). */
export const getResolvedColumnAndTableData = (
  playgroundConfig: PlaygroundConfig | null | undefined,
  requiredProps: Record<string, any>,
  dataPresetKey: string | null
): { columnDefinitions: any; tableData: any } => {
  const baseLayer: Record<string, any> = { ...requiredProps };
  if (dataPresetKey && playgroundConfig?.dataPresets?.presets?.[dataPresetKey]) {
    const pack = playgroundConfig.dataPresets.presets[dataPresetKey];
    baseLayer.columnDefinitions = pack.columnDefinitions;
    baseLayer.tableData = pack.tableData;
  }
  return {
    columnDefinitions: baseLayer.columnDefinitions,
    tableData: baseLayer.tableData,
  };
};

/** True when the prop is on in a way that should trigger propSyncOnEnable (booleans, non-empty sortIcon, etc.). */
export const shouldApplyPropSyncOnEnable = (value: PropValue | undefined): boolean => {
  if (!value?.enabled) return false;
  const v = value.value;
  if (typeof v === "boolean") return v === true;
  if (typeof v === "string") return v.trim().length > 0;
  // Empty [] still passes the prop (e.g. rowStyling); propSync may need to switch sample data (with_ids).
  if (Array.isArray(v)) return true;
  if (typeof v === "object" && v !== null) {
    return Object.keys(v as Record<string, unknown>).length > 0;
  }
  return v !== undefined && v !== null && v !== "";
};

/** Short label for Props panel: what sample data / structure this prop expects when enabled. */
export const getPropSyncContextHint = (
  propName: string,
  playgroundConfig: PlaygroundConfig | null | undefined
): string | null => {
  const rule = playgroundConfig?.propSyncOnEnable?.[propName];
  if (!rule) return null;
  const parts: string[] = [];
  if (rule.dataPreset) {
    const label =
      playgroundConfig?.dataPresets?.presets?.[rule.dataPreset]?.label ??
      rule.dataPreset;
    parts.push(`sample data “${label}”`);
  }
  if (rule.structureMode) {
    const label =
      playgroundConfig?.structureModes?.modes?.[rule.structureMode]?.label ??
      rule.structureMode;
    parts.push(`structure “${label}”`);
  }
  if (parts.length === 0) return null;
  return `To use ${propName}, enable: ${parts.join(" · ")}`;
};

export const prepareExampleCode = (source: string): string => {
  let code = source
    .split("\n")
    .filter((l) => !l.trim().startsWith("import "))
    .join("\n");

  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+)/;
  if (defaultExportRegex.test(code)) {
    code = code.replace(defaultExportRegex, "const __Exported = $1");
    code += `\nrender(<__Exported />)`;
  }

  return code;
};

/** Value as codegen/runtime would see it, including implicit defaults when `enabled` is false. */
export const getEffectivePlaygroundPropValue = (
  name: string,
  propValues: Record<string, PropValue>,
  playgroundConfig?: PlaygroundConfig | null,
  propDefinitions?: Record<string, PropDefinition>
): unknown => {
  const pv = propValues[name];
  if (pv?.enabled) return pv.value;
  if (playgroundConfig?.defaults?.[name] !== undefined) {
    return playgroundConfig.defaults[name];
  }
  return resolveSchemaDefault(propDefinitions?.[name]);
};

export type PlaygroundConditionContext = {
  playgroundConfig?: PlaygroundConfig | null;
  propDefinitions?: Record<string, PropDefinition>;
};

export const checkCondition = (
  condition: PropCondition["requires"] | PropCondition["showWhen"],
  propValues: Record<string, PropValue>,
  context?: PlaygroundConditionContext
): boolean => {
  if (!condition) return true;

  if (typeof condition === "string") {
    const effective = context
      ? getEffectivePlaygroundPropValue(
          condition,
          propValues,
          context.playgroundConfig,
          context.propDefinitions
        )
      : undefined;
    if (context) {
      if (effective === undefined || effective === null || effective === "") {
        return false;
      }
      if (typeof effective === "boolean") return effective;
      if (typeof effective === "object") {
        return Object.keys(effective as Record<string, unknown>).length > 0;
      }
      return Boolean(effective);
    }
    const propVal = propValues[condition];
    return propVal?.enabled && Boolean(propVal?.value);
  }

  if (typeof condition === "object") {
    return Object.entries(condition).every(([propName, expectedValue]) => {
      if (context?.propDefinitions || context?.playgroundConfig !== undefined) {
        const effective = getEffectivePlaygroundPropValue(
          propName,
          propValues,
          context.playgroundConfig,
          context.propDefinitions
        );
        return effective === expectedValue;
      }
      const propVal = propValues[propName];
      if (!propVal?.enabled) return false;
      return propVal.value === expectedValue;
    });
  }

  return true;
};

export const checkHintCondition = (
  when: Record<string, any>,
  propValues: Record<string, PropValue>,
  context?: PlaygroundConditionContext
): boolean => {
  return Object.entries(when).every(([propName, expectedValue]) => {
    const propVal = propValues[propName];

    if (context?.propDefinitions || context?.playgroundConfig !== undefined) {
      const effective = getEffectivePlaygroundPropValue(
        propName,
        propValues,
        context.playgroundConfig,
        context.propDefinitions
      );
      if (expectedValue === null) {
        return (
          effective === undefined ||
          effective === null ||
          effective === ""
        );
      }
      if (expectedValue === true) {
        return effective === true;
      }
      if (expectedValue === false) {
        return effective === false;
      }
      return effective === expectedValue;
    }

    if (expectedValue === null) {
      return !propVal?.enabled || !propVal?.value;
    }

    if (expectedValue === true) {
      return propVal?.enabled && propVal?.value === true;
    }

    if (expectedValue === false) {
      return propVal?.enabled && propVal?.value === false;
    }

    if (propVal?.enabled) {
      return propVal.value === expectedValue;
    }

    return false;
  });
};

/**
 * Pretty-print for object prop textareas: `{ "default": true }` becomes `{ default: true }` style
 * (unquoted keys where valid JS identifiers). Still parses via JSON.parse in PropControl.
 */
export function playgroundObjectToEditableLiteral(value: unknown): string {
  if (value === null || typeof value !== "object") {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (typeof value === "boolean" || typeof value === "number") return String(value);
    if (typeof value === "string") return JSON.stringify(value);
    return String(value);
  }
  const raw = JSON.stringify(value, null, 2);
  return raw.replace(/^(\s*)"([a-zA-Z_$][a-zA-Z0-9_$]*)"\s*:/gm, "$1$2:");
}
