import { useMemo } from "react";
import type { PropValue } from "../KitShow/Tabs/Playground";
import type {
  PlaygroundConfig,
  PropDefinition,
} from "../KitShow/Tabs/Playground/types";
import { GLOBAL_PROP_GROUPS } from "../KitShow/Tabs/Playground/constants";
import {
  buildPropDisabledState,
  buildPropSyncHints,
  groupPropDefinitions,
  mergeImplicitDefaultPropValues,
} from "../KitShow/Tabs/Playground/utils";
import type { ResolvedPropGroup } from "../KitShow/Tabs/Playground/utils";
import {
  getAllPropDefinitionsWithGlobals,
  getGlobalProps,
  getGroupedEditableProps,
  getPropValue,
  getRequiredPropNames,
  getStructureModeConfig,
} from "./kitUtils";
import type { BuilderInstance, PlaygroundKit } from "./types";

type GlobalPropsSchema = {
  props?: Record<string, import("./types").PropDefinition>;
};

export type BuilderPropsPanelState = {
  groupedProps: ResolvedPropGroup[];
  groupedGlobalProps: ResolvedPropGroup[];
  displayPropValues: Record<string, PropValue>;
  propDisabledState: Record<string, { disabled: boolean; reason: string }>;
  propSyncHints: Record<string, string>;
  totalProps: number;
  showChildren: boolean;
  children: string;
  globalProps: Record<string, PropDefinition>;
  showGlobalProps: boolean;
  playgroundConfig: PlaygroundConfig | null | undefined;
  requiredPropNames: Set<string>;
};

export function useBuilderPropsPanel(
  selectedInstance: BuilderInstance | undefined,
  selectedKit: PlaygroundKit | undefined,
  globalPropsSchema: GlobalPropsSchema | null | undefined,
): BuilderPropsPanelState {
  const playgroundConfig = selectedKit?.playground_config;
  const globalProps = getGlobalProps(selectedKit, globalPropsSchema?.props);
  const allPropDefinitions = useMemo(
    () =>
      getAllPropDefinitionsWithGlobals(selectedKit, globalPropsSchema?.props),
    [selectedKit, globalPropsSchema?.props],
  );

  const groupedProps = useMemo(
    () => getGroupedEditableProps(selectedKit),
    [selectedKit],
  );

  const groupedGlobalProps = useMemo(
    () => groupPropDefinitions(globalProps, GLOBAL_PROP_GROUPS),
    [globalProps],
  );

  const totalProps = useMemo(
    () => groupedProps.reduce((count, group) => count + group.props.length, 0),
    [groupedProps],
  );

  const propValues = useMemo(() => {
    if (!selectedInstance || !selectedKit) return {};

    const values: Record<string, PropValue> = {};
    const propNames = new Set<string>();

    groupedProps.forEach((group) => {
      group.props.forEach(([name]) => propNames.add(name));
    });
    groupedGlobalProps.forEach((group) => {
      group.props.forEach(([name]) => propNames.add(name));
    });

    propNames.forEach((name) => {
      values[name] = getPropValue(selectedInstance, selectedKit, name);
    });

    return values;
  }, [selectedInstance, selectedKit, groupedProps, groupedGlobalProps]);

  const displayPropValues = useMemo(
    () =>
      mergeImplicitDefaultPropValues(
        propValues,
        playgroundConfig,
        allPropDefinitions,
      ),
    [propValues, playgroundConfig, allPropDefinitions],
  );

  const propDisabledState = useMemo(
    () =>
      buildPropDisabledState({
        allPropDefinitions,
        playgroundConfig,
        propValues,
        structureMode: selectedInstance?.structureMode,
      }),
    [
      playgroundConfig,
      selectedInstance?.structureMode,
      propValues,
      allPropDefinitions,
    ],
  );

  const propSyncHints = useMemo(
    () => buildPropSyncHints(playgroundConfig),
    [playgroundConfig],
  );

  const requiredPropNames = useMemo(
    () => getRequiredPropNames(selectedKit, selectedInstance),
    [selectedKit, selectedInstance],
  );

  const showChildren = useMemo(() => {
    if (!selectedKit?.playground_config?.children?.editable) return false;

    const mode = getStructureModeConfig(
      selectedKit,
      selectedInstance?.structureMode ?? null,
    );
    const template =
      mode?.template ?? selectedKit.playground_config?.template;
    if (template && !template.includes("{{children}}")) return false;

    return true;
  }, [selectedKit, selectedInstance?.structureMode]);

  const children = selectedInstance?.configuredChildren ?? "";

  return {
    groupedProps: groupedProps as ResolvedPropGroup[],
    groupedGlobalProps: groupedGlobalProps as ResolvedPropGroup[],
    displayPropValues,
    propDisabledState,
    propSyncHints,
    totalProps,
    showChildren,
    children,
    globalProps: globalProps as Record<string, PropDefinition>,
    showGlobalProps: Object.keys(globalProps).length > 0,
    playgroundConfig: playgroundConfig as PlaygroundConfig | null | undefined,
    requiredPropNames,
  };
}
