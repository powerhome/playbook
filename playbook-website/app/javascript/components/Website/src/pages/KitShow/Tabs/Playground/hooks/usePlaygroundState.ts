import { useState, useMemo, useCallback } from "react";
import {
  KitSchema,
  GlobalPropsSchema,
  PropValue,
  PropDefinition,
  PlaygroundConfig,
  PlaygroundHint,
} from "../types";
import {
  generateCode,
  generateLiveCode,
  generateFromTemplate,
  generateLiveFromTemplate,
  getDefaultChildren,
  needsChildren,
} from "../CodeGenerator";
import { prepareExampleCode, checkCondition, checkHintCondition } from "../utils";
import { EXCLUDED_PROPS } from "../constants";

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
  
  const getInitialPropValues = (): Record<string, PropValue> => {
    if (!firstPreset) return {};
    const values: Record<string, PropValue> = {};
    Object.entries(firstPreset.props).forEach(([propName, value]) => {
      values[propName] = { value, enabled: true };
    });
    return values;
  };

  const getInitialChildren = (): string => {
    if (firstPreset?.children !== undefined) return firstPreset.children;
    return playgroundConfig?.children?.default ?? getDefaultChildren(kitName);
  };

  const [propValues, setPropValues] = useState<Record<string, PropValue>>(getInitialPropValues);
  const [children, setChildren] = useState<string>(getInitialChildren);
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(
    firstPreset ? 0 : null
  );

  // Filter props for React platform
  const reactProps = useMemo(() => {
    if (!kitSchema?.props) return {};

    const filtered: Record<string, PropDefinition> = {};
    Object.entries(kitSchema.props).forEach(([name, def]) => {
      const isReactProp =
        !def.platforms || def.platforms.length === 0 || def.platforms.includes("react");
      const isExcluded =
        EXCLUDED_PROPS.includes(name) || EXCLUDED_PROPS.includes(name.toLowerCase());

      if (isReactProp && !isExcluded) {
        filtered[name] = def;
      }
    });
    return filtered;
  }, [kitSchema]);

  const globalProps = useMemo(() => {
    if (!globalPropsSchema?.props || !kitSchema?.globalProps) return {};
    return globalPropsSchema.props;
  }, [globalPropsSchema, kitSchema]);

  const allPropDefinitions = useMemo(
    () => ({ ...reactProps, ...globalProps }),
    [reactProps, globalProps]
  );

  // Handlers
  const handlePropChange = useCallback((name: string, value: PropValue) => {
    setPropValues((prev) => ({ ...prev, [name]: value }));
    setActivePresetIndex(null);
  }, []);

  const applyPreset = useCallback(
    (presetIndex: number) => {
      const preset = playgroundConfig?.presets?.[presetIndex];
      if (!preset) return;

      const newPropValues: Record<string, PropValue> = {};
      Object.entries(preset.props).forEach(([propName, value]) => {
        newPropValues[propName] = { value, enabled: true };
      });

      setPropValues(newPropValues);
      setActivePresetIndex(presetIndex);
      if (preset.children !== undefined) {
        setChildren(preset.children);
      }
    },
    [playgroundConfig]
  );

  // Computed state
  const propDisabledState = useMemo(() => {
    const state: Record<string, { disabled: boolean; reason: string }> = {};
    const conditionals = playgroundConfig?.conditionals ?? {};

    Object.entries(conditionals).forEach(([propName, condition]) => {
      const requiresMet = checkCondition(condition.requires, propValues);
      const showWhenMet = checkCondition(condition.showWhen, propValues);

      if (!requiresMet || !showWhenMet) {
        let reason = "This prop is not available in the current configuration";

        if (condition.requires) {
          if (typeof condition.requires === "string") {
            reason = `Requires "${condition.requires}" to be set`;
          } else if (typeof condition.requires === "object") {
            const conditions = Object.entries(condition.requires)
              .map(([k, v]) => `${k}="${v}"`)
              .join(" and ");
            reason = `Requires ${conditions}`;
          }
        }

        state[propName] = { disabled: true, reason };
      }
    });

    return state;
  }, [playgroundConfig?.conditionals, propValues]);

  const activeHints = useMemo(() => {
    const hints: Array<PlaygroundHint & { id: string }> = [];
    const hintConfig = playgroundConfig?.hints ?? {};

    Object.entries(hintConfig).forEach(([id, hint]) => {
      if (checkHintCondition(hint.when, propValues)) {
        hints.push({ ...hint, id });
      }
    });

    return hints;
  }, [playgroundConfig?.hints, propValues]);

  const hasModifiedProps = Object.values(propValues).some((p) => p.enabled);
  const hasTemplate = Boolean(playgroundConfig?.template);

  const showChildren = useMemo(() => {
    if (playgroundConfig?.children) {
      if (playgroundConfig.children.hideWhenPropSet) {
        const shouldHide = playgroundConfig.children.hideWhenPropSet.some(
          (propName) => propValues[propName]?.enabled && propValues[propName]?.value
        );
        if (shouldHide) return false;
      }
      return playgroundConfig.children.editable;
    }
    return needsChildren(kitName);
  }, [kitName, playgroundConfig, propValues]);

  // Grouped props
  const groupedProps = useMemo(() => {
    const groups = playgroundConfig?.groups;
    if (!groups || groups.length === 0) {
      return [{ name: "", props: Object.entries(reactProps) }];
    }

    const result: Array<{ name: string; props: Array<[string, PropDefinition]> }> = [];
    const assignedProps = new Set<string>();

    groups.forEach((group) => {
      const groupProps: Array<[string, PropDefinition]> = [];
      group.props.forEach((propName) => {
        if (reactProps[propName]) {
          groupProps.push([propName, reactProps[propName]]);
          assignedProps.add(propName);
        }
      });
      if (groupProps.length > 0) {
        result.push({ name: group.name, props: groupProps });
      }
    });

    const otherProps = Object.entries(reactProps).filter(([name]) => !assignedProps.has(name));
    if (otherProps.length > 0) {
      result.push({ name: "Other", props: otherProps });
    }

    return result;
  }, [reactProps, playgroundConfig?.groups]);

  // Code generation
  const generatedDisplayCode = useMemo(() => {
    if (hasTemplate && playgroundConfig) {
      return generateFromTemplate({
        template: playgroundConfig.template,
        propValues,
        propDefinitions: allPropDefinitions,
        propTargets: playgroundConfig.propTargets,
        defaults: playgroundConfig.defaults,
        children,
        childrenConfig: playgroundConfig.children,
        includeImport: true,
      });
    }
    return generateCode({
      componentName: kitName,
      propValues,
      propDefinitions: allPropDefinitions,
      children: needsChildren(kitName) ? children : undefined,
      includeImport: true,
    });
  }, [kitName, propValues, allPropDefinitions, children, hasTemplate, playgroundConfig]);

  const generatedLiveCode = useMemo(() => {
    if (hasTemplate && playgroundConfig) {
      return generateLiveFromTemplate({
        template: playgroundConfig.template,
        propValues,
        propDefinitions: allPropDefinitions,
        propTargets: playgroundConfig.propTargets,
        defaults: playgroundConfig.defaults,
        children,
        childrenConfig: playgroundConfig.children,
      });
    }
    return generateLiveCode({
      componentName: kitName,
      propValues,
      propDefinitions: allPropDefinitions,
      children: needsChildren(kitName) ? children : undefined,
    });
  }, [kitName, propValues, allPropDefinitions, children, hasTemplate, playgroundConfig]);

  const previewCode = useMemo(() => {
    if (hasTemplate) return generatedLiveCode;
    if (!hasModifiedProps && defaultExample?.source) {
      return prepareExampleCode(defaultExample.source);
    }
    return generatedLiveCode;
  }, [hasTemplate, hasModifiedProps, defaultExample, generatedLiveCode]);

  const displayCode = useMemo(() => {
    if (hasTemplate) return generatedDisplayCode;
    if (!hasModifiedProps && defaultExample?.source) {
      return defaultExample.source;
    }
    return generatedDisplayCode;
  }, [hasTemplate, hasModifiedProps, defaultExample, generatedDisplayCode]);

  return {
    // State
    propValues,
    children,
    activePresetIndex,
    
    // Derived data
    reactProps,
    globalProps,
    allPropDefinitions,
    groupedProps,
    propDisabledState,
    activeHints,
    hasModifiedProps,
    hasTemplate,
    showChildren,
    previewCode,
    displayCode,
    
    // Handlers
    handlePropChange,
    applyPreset,
    setChildren,
  };
};
