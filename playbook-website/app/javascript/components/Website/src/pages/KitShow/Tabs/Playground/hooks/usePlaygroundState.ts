import { useState, useMemo, useCallback, useEffect } from "react";
import {
  KitSchema,
  GlobalPropsSchema,
  PropValue,
  PropDefinition,
  PlaygroundConfig,
  PlaygroundHint,
  StructureMode,
} from "../types";
import {
  generateCode,
  generateLiveCode,
  generateFromTemplate,
  generateLiveFromTemplate,
  getDefaultChildren,
  needsChildren,
} from "../CodeGenerator";
import {
  buildPlaygroundPropValues,
  buildPropDisabledState,
  buildPropSyncHints,
  checkHintCondition,
  mergeImplicitDefaultPropValues,
  getResolvedColumnAndTableData,
  prepareExampleCode,
  shouldApplyPropSyncOnEnable,
  groupPropDefinitions,
} from "../utils";
import { EXCLUDED_PROPS, GLOBAL_PROP_GROUPS } from "../constants";

interface Example {
  example_key: string;
  title: string;
  source: string;
  description?: string;
}

interface UsePlaygroundStateProps {
  kitSchema: KitSchema | null;
  globalPropsSchema: GlobalPropsSchema | null;
  kitName: string;
  defaultExample?: Example;
  playgroundConfig?: PlaygroundConfig | null;
}

export const usePlaygroundState = ({
  kitSchema,
  globalPropsSchema,
  kitName,
  defaultExample,
  playgroundConfig,
}: UsePlaygroundStateProps) => {
  // Initialize with first preset if available
  const firstPreset = playgroundConfig?.presets?.[0];
  const firstPresetIndex = firstPreset ? 0 : null;
  
  // Get required props (always enabled with default values)
  const requiredProps = useMemo(
    () => playgroundConfig?.requiredProps ?? {},
    [playgroundConfig?.requiredProps]
  );
  const requiredPropNames = useMemo(() => new Set(Object.keys(requiredProps)), [requiredProps]);

  const defaultStructureMode = playgroundConfig?.structureModes?.default ?? null;

  const getStructureModeForPreset = useCallback((presetIndex: number | null, fallback: string | null): string | null => {
    const preset =
      presetIndex != null && playgroundConfig?.presets?.[presetIndex]
        ? playgroundConfig.presets[presetIndex]
        : null;
    return preset?.structureMode ?? fallback;
  }, [playgroundConfig]);

  const getDataPresetForPreset = useCallback((presetIndex: number | null, fallback: string | null): string | null => {
    const preset =
      presetIndex != null && playgroundConfig?.presets?.[presetIndex]
        ? playgroundConfig.presets[presetIndex]
        : null;
    return preset?.dataPreset !== undefined ? preset.dataPreset : fallback;
  }, [playgroundConfig]);

  const getChildrenForState = useCallback((presetIndex: number | null, structureModeKey: string | null): string => {
    const preset =
      presetIndex != null && playgroundConfig?.presets?.[presetIndex]
        ? playgroundConfig.presets[presetIndex]
        : null;
    if (preset?.children !== undefined) return preset.children;

    const mode = structureModeKey
      ? playgroundConfig?.structureModes?.modes?.[structureModeKey]
      : null;
    if (mode?.children !== undefined) return mode.children;

    const d = playgroundConfig?.children?.default;
    if (d !== undefined && d !== null && d !== "") return d;
    return getDefaultChildren(kitName);
  }, [kitName, playgroundConfig]);

  const initialStructureMode = getStructureModeForPreset(firstPresetIndex, defaultStructureMode);
  const initialDataPresetKey = getDataPresetForPreset(firstPresetIndex, null);

  const hiddenPropNames = useMemo(
    () => new Set(playgroundConfig?.hiddenProps ?? []),
    [playgroundConfig?.hiddenProps]
  );

  const reactProps = useMemo(() => {
    if (!kitSchema?.props) return {};

    const filtered: Record<string, PropDefinition> = {};
    Object.entries(kitSchema.props).forEach(([name, def]) => {
      const isReactProp =
        !def.platforms || def.platforms.length === 0 || def.platforms.includes("react");
      const isExcluded =
        EXCLUDED_PROPS.includes(name) || EXCLUDED_PROPS.includes(name.toLowerCase());

      if (isReactProp && !isExcluded && !hiddenPropNames.has(name)) {
        filtered[name] = def;
      }
    });
    return filtered;
  }, [kitSchema, hiddenPropNames]);

  const globalProps = useMemo(() => {
    if (!globalPropsSchema?.props || !kitSchema?.globalProps) return {};
    return globalPropsSchema.props;
  }, [globalPropsSchema, kitSchema]);

  const playgroundProps = useMemo(
    () => ({ ...reactProps, ...(playgroundConfig?.customProps ?? {}) }),
    [reactProps, playgroundConfig?.customProps]
  );

  const allPropDefinitions = useMemo(
    () => ({ ...playgroundProps, ...globalProps }),
    [playgroundProps, globalProps]
  );

  const buildFullPropValues = useCallback(
    (
      dataPresetKey: string | null,
      structureModeKey: string | null,
      presetIndex: number | null
    ) =>
      mergeImplicitDefaultPropValues(
        buildPlaygroundPropValues(
          playgroundConfig,
          requiredProps,
          dataPresetKey,
          structureModeKey,
          presetIndex
        ),
        playgroundConfig,
        allPropDefinitions
      ),
    [playgroundConfig, requiredProps, allPropDefinitions]
  );

  const [activeDataPresetKey, setActiveDataPresetKey] = useState<string | null>(initialDataPresetKey);
  const [propValues, setPropValues] = useState<Record<string, PropValue>>(() =>
    buildFullPropValues(initialDataPresetKey, initialStructureMode, firstPresetIndex)
  );
  const [children, setChildren] = useState<string>(() =>
    getChildrenForState(firstPresetIndex, initialStructureMode)
  );
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(
    firstPresetIndex
  );

  const [activeStructureMode, setActiveStructureMode] = useState<string | null>(initialStructureMode);

  // Reset all state when kit changes
  useEffect(() => {
    const nextPresetIndex = playgroundConfig?.presets?.[0] ? 0 : null;
    const nextStructureMode = getStructureModeForPreset(
      nextPresetIndex,
      playgroundConfig?.structureModes?.default ?? null
    );
    const nextDataPresetKey = getDataPresetForPreset(nextPresetIndex, null);

    setActiveDataPresetKey(nextDataPresetKey);
    setPropValues(
      buildFullPropValues(
        nextDataPresetKey,
        nextStructureMode,
        nextPresetIndex
      )
    );
    setChildren(
      getChildrenForState(
        nextPresetIndex,
        nextStructureMode
      )
    );
    setActivePresetIndex(nextPresetIndex);
    setActiveStructureMode(nextStructureMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kitName]);
  
  // Get current structure mode config
  const currentStructureMode: StructureMode | null = useMemo(() => {
    if (!activeStructureMode || !playgroundConfig?.structureModes?.modes) return null;
    return playgroundConfig.structureModes.modes[activeStructureMode] ?? null;
  }, [activeStructureMode, playgroundConfig]);
  
  // Get available structure modes for UI
  const availableStructureModes = useMemo(() => {
    if (!playgroundConfig?.structureModes?.modes) return [];
    return Object.entries(playgroundConfig.structureModes.modes).map(([key, mode]) => ({
      key,
      label: mode.label,
    }));
  }, [playgroundConfig]);

  const availableDataPresets = useMemo(() => {
    const presets = playgroundConfig?.dataPresets?.presets;
    if (!presets) return [];
    return Object.entries(presets).map(([key, preset]) => ({
      key,
      label: preset.label,
    }));
  }, [playgroundConfig]);

  // Handlers
  const handlePropChange = useCallback(
    (name: string, value: PropValue) => {
      if (requiredPropNames.has(name) && !value.enabled) {
        return;
      }
      if (
        playgroundConfig?.dataPresets &&
        (name === "columnDefinitions" || name === "tableData")
      ) {
        setActiveDataPresetKey(null);
      }

      const syncRule = playgroundConfig?.propSyncOnEnable?.[name];
      let nextDataPreset = activeDataPresetKey;
      let nextStructureMode = activeStructureMode;
      if (syncRule && shouldApplyPropSyncOnEnable(value)) {
        if (syncRule.dataPreset) nextDataPreset = syncRule.dataPreset;
        if (syncRule.structureMode) nextStructureMode = syncRule.structureMode;
      }

      const dataOrStructureChanged =
        nextDataPreset !== activeDataPresetKey ||
        nextStructureMode !== activeStructureMode;

      if (dataOrStructureChanged) {
        if (nextDataPreset !== activeDataPresetKey) {
          setActiveDataPresetKey(nextDataPreset);
        }
        if (nextStructureMode !== activeStructureMode) {
          setActiveStructureMode(nextStructureMode);
          setChildren(getChildrenForState(null, nextStructureMode));
        }
      }

      setPropValues((prev) => {
        const merged: Record<string, PropValue> = { ...prev, [name]: value };
        if (dataOrStructureChanged && nextDataPreset !== activeDataPresetKey) {
          const { columnDefinitions, tableData } = getResolvedColumnAndTableData(
            playgroundConfig,
            requiredProps,
            nextDataPreset
          );
          merged.columnDefinitions = { value: columnDefinitions, enabled: true };
          merged.tableData = { value: tableData, enabled: true };
        }
        return merged;
      });
      setActivePresetIndex(null);
    },
    [
      requiredPropNames,
      playgroundConfig,
      requiredProps,
      activeDataPresetKey,
      activeStructureMode,
      getChildrenForState,
    ]
  );

  const applyPreset = useCallback(
    (presetIndex: number) => {
      const preset = playgroundConfig?.presets?.[presetIndex];
      if (!preset) return;

      let nextDataPreset =
        preset.dataPreset !== undefined
          ? preset.dataPreset
          : activeDataPresetKey;
      const structureModeForBuild = getStructureModeForPreset(presetIndex, activeStructureMode);
      let nextStructureMode = structureModeForBuild;

      const built = buildFullPropValues(
        nextDataPreset,
        structureModeForBuild,
        presetIndex
      );

      const syncMap = playgroundConfig?.propSyncOnEnable;
      if (syncMap) {
        Object.entries(syncMap).forEach(([prop, rule]) => {
          if (!shouldApplyPropSyncOnEnable(built[prop])) return;
          if (rule.dataPreset) nextDataPreset = rule.dataPreset;
          if (rule.structureMode) nextStructureMode = rule.structureMode;
        });
      }

      const dataOrStructureChanged =
        nextDataPreset !== activeDataPresetKey ||
        nextStructureMode !== activeStructureMode;

      if (dataOrStructureChanged) {
        if (nextDataPreset !== activeDataPresetKey) {
          setActiveDataPresetKey(nextDataPreset);
        }
        if (nextStructureMode !== activeStructureMode) {
          setActiveStructureMode(nextStructureMode);
        }
        setPropValues(
          buildFullPropValues(nextDataPreset, nextStructureMode, presetIndex)
        );
      } else {
        setPropValues(built);
      }

      setActivePresetIndex(presetIndex);
      setChildren(getChildrenForState(presetIndex, nextStructureMode));
    },
    [
      buildFullPropValues,
      activeDataPresetKey,
      activeStructureMode,
      getStructureModeForPreset,
      getChildrenForState,
      playgroundConfig,
    ]
  );

  const handleDataPresetChange = useCallback(
    (dataPresetKey: string | null) => {
      setActiveDataPresetKey(dataPresetKey);
      setPropValues(
        buildFullPropValues(dataPresetKey, activeStructureMode, activePresetIndex)
      );
    },
    [buildFullPropValues, activeStructureMode, activePresetIndex]
  );

  // Computed state
  const propDisabledState = useMemo(
    () =>
      buildPropDisabledState({
        allPropDefinitions,
        playgroundConfig,
        propValues,
        structureMode: activeStructureMode,
      }),
    [
      playgroundConfig,
      propValues,
      activeStructureMode,
      allPropDefinitions,
    ],
  );

  const propSyncHints = useMemo(
    () => buildPropSyncHints(playgroundConfig),
    [playgroundConfig],
  );

  // Props that fail conditionals must not appear in generated code (or live preview)
  const propValuesForCodegen = useMemo(() => {
    const out: Record<string, PropValue> = { ...propValues };
    Object.entries(propDisabledState).forEach(([name, { disabled }]) => {
      if (disabled && out[name]) {
        out[name] = { ...out[name], enabled: false };
      }
    });
    return out;
  }, [propValues, propDisabledState]);

  const displayPropValues = useMemo(
    () =>
      mergeImplicitDefaultPropValues(
        propValues,
        playgroundConfig,
        allPropDefinitions,
      ),
    [propValues, playgroundConfig, allPropDefinitions],
  );

  const activeHints = useMemo(() => {
    const hints: Array<PlaygroundHint & { id: string }> = [];
    const hintConfig = playgroundConfig?.hints ?? {};
    const presets = playgroundConfig?.presets ?? [];

    const hintCtx = {
      playgroundConfig,
      propDefinitions: allPropDefinitions,
    };
    Object.entries(hintConfig).forEach(([id, hint]) => {
      if (hint.presetName != null) {
        const idx = presets.findIndex((p) => p.name === hint.presetName);
        if (idx < 0 || activePresetIndex !== idx) {
          return;
        }
      } else if (hint.presetIndex != null) {
        if (activePresetIndex !== hint.presetIndex) {
          return;
        }
      }

      if (checkHintCondition(hint.when ?? {}, propValues, hintCtx)) {
        hints.push({ ...hint, id });
      }
    });

    return hints;
  }, [
    playgroundConfig?.hints,
    playgroundConfig?.presets,
    propValues,
    playgroundConfig,
    allPropDefinitions,
    activePresetIndex,
  ]);

  const hasModifiedProps = useMemo(
    () =>
      Object.entries(propValues).some(
        ([name, p]) => p.enabled && !requiredPropNames.has(name)
      ),
    [propValues, requiredPropNames]
  );

  const showChildren = useMemo(() => {
    const template = currentStructureMode?.template ?? playgroundConfig?.template;

    if (playgroundConfig?.children) {
      if (template && !template.includes("{{children}}")) return false;

      if (playgroundConfig.children.hideWhenPropSet) {
        const shouldHide = playgroundConfig.children.hideWhenPropSet.some(
          (propName) => propValues[propName]?.enabled && propValues[propName]?.value
        );
        if (shouldHide) return false;
      }
      return playgroundConfig.children.editable;
    }
    return needsChildren(kitName);
  }, [kitName, playgroundConfig, propValues, currentStructureMode?.template]);

  // Grouped props
  const groupedProps = useMemo(() => {
    const groups = playgroundConfig?.groups;
    if (!groups || groups.length === 0) {
      return [{ name: "", props: Object.entries(playgroundProps) }];
    }
    return groupPropDefinitions(playgroundProps, groups);
  }, [playgroundProps, playgroundConfig?.groups]);

  const groupedGlobalProps = useMemo(
    () => groupPropDefinitions(globalProps, GLOBAL_PROP_GROUPS),
    [globalProps],
  );

  // Resolve template and propTargets - structure mode takes precedence
  const activeTemplate = currentStructureMode?.template ?? playgroundConfig?.template;
  const hasActiveTemplate = Boolean(activeTemplate);
  
  // Merge propTargets: base config + structure mode overrides
  const activePropTargets = useMemo(() => {
    const base = playgroundConfig?.propTargets ?? {};
    const modeTargets = currentStructureMode?.propTargets ?? {};
    return { ...base, ...modeTargets };
  }, [playgroundConfig?.propTargets, currentStructureMode?.propTargets]);

  const activePropAliases = useMemo(() => {
    const base = playgroundConfig?.propAliases ?? {};
    const modeAliases = currentStructureMode?.propAliases ?? {};
    return { ...base, ...modeAliases };
  }, [playgroundConfig?.propAliases, currentStructureMode?.propAliases]);

  const activeExternalImports = useMemo(
    () => [
      ...(playgroundConfig?.externalImports ?? []),
      ...(currentStructureMode?.externalImports ?? []),
    ],
    [playgroundConfig?.externalImports, currentStructureMode?.externalImports]
  );

  const activeWrapper = currentStructureMode?.wrapper ?? playgroundConfig?.wrapper;

  // Code generation
  const generatedDisplayCode = useMemo(() => {
    if (hasActiveTemplate && playgroundConfig) {
      return generateFromTemplate({
        template: activeTemplate!,
        propValues: propValuesForCodegen,
        propDefinitions: allPropDefinitions,
        propTargets: activePropTargets,
        propAliases: activePropAliases,
        children,
        childrenConfig: playgroundConfig.children,
        includeImport: true,
        customImports: currentStructureMode?.imports,
        externalImports: activeExternalImports,
        wrapper: activeWrapper,
        requiredProps,
      });
    }
    return generateCode({
      componentName: kitName,
      propValues: propValuesForCodegen,
      propDefinitions: allPropDefinitions,
      children: needsChildren(kitName) ? children : undefined,
      includeImport: true,
    });
  }, [kitName, propValuesForCodegen, allPropDefinitions, children, hasActiveTemplate, activeTemplate, activePropTargets, activePropAliases, playgroundConfig, currentStructureMode, activeExternalImports, activeWrapper, requiredProps]);

  const generatedLiveCode = useMemo(() => {
    if (hasActiveTemplate && playgroundConfig) {
      return generateLiveFromTemplate({
        template: activeTemplate!,
        propValues: propValuesForCodegen,
        propDefinitions: allPropDefinitions,
        propTargets: activePropTargets,
        propAliases: activePropAliases,
        children,
        childrenConfig: playgroundConfig.children,
        customImports: currentStructureMode?.imports,
        externalImports: activeExternalImports,
        wrapper: activeWrapper,
        requiredProps,
      });
    }
    return generateLiveCode({
      componentName: kitName,
      propValues: propValuesForCodegen,
      propDefinitions: allPropDefinitions,
      children: needsChildren(kitName) ? children : undefined,
    });
  }, [kitName, propValuesForCodegen, allPropDefinitions, children, hasActiveTemplate, activeTemplate, activePropTargets, activePropAliases, playgroundConfig, currentStructureMode, activeExternalImports, activeWrapper, requiredProps]);

  const previewCode = useMemo(() => {
    if (hasActiveTemplate) return generatedLiveCode;
    if (!hasModifiedProps && defaultExample?.source) {
      return prepareExampleCode(defaultExample.source);
    }
    return generatedLiveCode;
  }, [hasActiveTemplate, hasModifiedProps, defaultExample, generatedLiveCode]);

  const displayCode = useMemo(() => {
    if (hasActiveTemplate) return generatedDisplayCode;
    if (!hasModifiedProps && defaultExample?.source) {
      return defaultExample.source;
    }
    return generatedDisplayCode;
  }, [hasActiveTemplate, hasModifiedProps, defaultExample, generatedDisplayCode]);

  const handleStructureModeChange = useCallback(
    (modeKey: string) => {
      setActiveStructureMode(modeKey);
      setChildren(getChildrenForState(null, modeKey));
      setPropValues((prev) => {
        const preservedEnabledProps: Record<string, PropValue> = {};
        Object.entries(prev).forEach(([name, value]) => {
          if (value.enabled) {
            preservedEnabledProps[name] = value;
          }
        });

        const modePropValues = buildPlaygroundPropValues(
          playgroundConfig,
          requiredProps,
          activeDataPresetKey,
          modeKey,
          null
        );

        return mergeImplicitDefaultPropValues(
          {
            ...preservedEnabledProps,
            ...modePropValues,
          },
          playgroundConfig,
          allPropDefinitions
        );
      });
      setActivePresetIndex(null);
    },
    [
      activeDataPresetKey,
      allPropDefinitions,
      getChildrenForState,
      playgroundConfig,
      requiredProps,
    ]
  );

  const handleReset = useCallback(() => {
    const nextStructureMode = getStructureModeForPreset(
      firstPresetIndex,
      playgroundConfig?.structureModes?.default ?? null
    );
    const nextDataPresetKey = getDataPresetForPreset(firstPresetIndex, null);

    setActiveDataPresetKey(nextDataPresetKey);
    setPropValues(
      buildFullPropValues(
        nextDataPresetKey,
        nextStructureMode,
        firstPresetIndex
      )
    );
    setChildren(
      getChildrenForState(
        firstPresetIndex,
        nextStructureMode
      )
    );
    setActivePresetIndex(firstPresetIndex);
    setActiveStructureMode(nextStructureMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    buildFullPropValues,
    getChildrenForState,
    getDataPresetForPreset,
    getStructureModeForPreset,
    playgroundConfig,
    firstPresetIndex,
  ]);

  return {
    propValues,
    displayPropValues,
    children,
    activePresetIndex,
    activeStructureMode,
    activeDataPresetKey,

    reactProps: playgroundProps,
    globalProps,
    groupedGlobalProps,
    allPropDefinitions,
    groupedProps,
    propDisabledState,
    propSyncHints,
    activeHints,
    hasModifiedProps,
    hasTemplate: hasActiveTemplate,
    showChildren,
    previewCode,
    displayCode,
    availableStructureModes,
    availableDataPresets,
    requiredPropNames,

    handlePropChange,
    applyPreset,
    setChildren,
    handleStructureModeChange,
    handleDataPresetChange,
    handleReset,
  };
};
