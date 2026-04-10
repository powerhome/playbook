import { PropValue, PropCondition, PlaygroundConfig } from "./types";

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
  if (Array.isArray(v)) return v.length > 0;
  return v !== undefined && v !== null && v !== "";
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

export const checkCondition = (
  condition: PropCondition["requires"] | PropCondition["showWhen"],
  propValues: Record<string, PropValue>
): boolean => {
  if (!condition) return true;

  if (typeof condition === "string") {
    const propVal = propValues[condition];
    return propVal?.enabled && Boolean(propVal?.value);
  }

  if (typeof condition === "object") {
    return Object.entries(condition).every(([propName, expectedValue]) => {
      const propVal = propValues[propName];
      if (!propVal?.enabled) return false;
      return propVal.value === expectedValue;
    });
  }

  return true;
};

export const checkHintCondition = (
  when: Record<string, any>,
  propValues: Record<string, PropValue>
): boolean => {
  return Object.entries(when).every(([propName, expectedValue]) => {
    const propVal = propValues[propName];

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
