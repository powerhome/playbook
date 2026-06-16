import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import * as Playbook from "playbook-ui";
import {
  Badge,
  Body,
  Button,
  Caption,
  Card,
  Detail,
  Flex,
  Icon,
  TextInput,
  Title,
} from "playbook-ui";

import { PageContainer } from "../../components/PageContainer";
import {
  CodePanel,
  generateFromTemplate,
  generateLiveFromTemplate,
  PlaygroundPreview,
  PropControl,
  PropValue,
} from "../KitShow/Tabs/Playground";
import { linkFormat } from "../../../../../utilities/website_sidebar_helper";

import "./styles.scss";

type PropDefinition = {
  type?: string;
  platforms?: string[];
  values?: string[];
  default?: any;
  description?: string;
};

type PlaygroundKit = {
  name: string;
  label: string;
  category: string;
  description?: string;
  kit_schema: {
    name: string;
    props: Record<string, PropDefinition>;
    globalProps?: boolean;
  };
  playground_config?: {
    customProps?: Record<string, PropDefinition>;
    defaults?: Record<string, any>;
    children?: {
      editable?: boolean;
      default?: string;
    };
    dataPresets?: {
      presets?: Record<string, {
        label: string;
        columnDefinitions?: any[];
        tableData?: any[];
      }>;
    };
    groups?: Array<{
      name: string;
      props: string[];
    }>;
    hiddenProps?: string[];
    propAliases?: Record<string, string>;
    propSyncOnEnable?: Record<string, {
      dataPreset?: string;
      structureMode?: string;
    }>;
    propTargets?: Record<string, string>;
    requiredProps?: Record<string, any>;
    requiredCodeProps?: string[];
    structureModes?: {
      default?: string;
      modes?: Record<string, {
        label: string;
        template?: string;
        children?: string;
        props?: Record<string, any>;
        propTargets?: Record<string, string>;
        propAliases?: Record<string, string>;
        imports?: string[];
        externalImports?: string[];
        wrapper?: string;
      }>;
    };
    template?: string;
    wrapper?: string;
    externalImports?: string[];
  };
};

type PlaygroundLoaderData = {
  global_props_schema?: {
    props?: Record<string, PropDefinition>;
  };
  playground_kits: PlaygroundKit[];
};

type BuilderInstance = {
  id: string;
  kitName: string;
  structureMode: string | null;
  dataPresetKey: string | null;
  props: Record<string, any>;
  enabledProps: Record<string, boolean>;
  children: BuilderInstance[];
};

type TargetOption = {
  id: string;
  label: string;
};

const ROOT_TARGET_ID = "root";

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

const STARTER_VALUES: Record<string, any> = {
  label: "Label",
  name: "Playbook User",
  placeholder: "Enter text",
  subtitle: "Supporting detail",
  text: "Text",
  title: "Title",
  unit: "%",
  value: "42",
};

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

const TEMPLATE_PREVIEW_KITS = new Set([
  "advanced_table",
  "collapsible",
  "dialog",
  "dropdown",
  "overlay",
  "popover",
  "tooltip",
]);

const formatKitName = (name: string) => linkFormat(name);

const displayPropType = (definition?: PropDefinition) =>
  String(definition?.type ?? "string").toLowerCase();

const isReactProp = (definition: PropDefinition) =>
  !definition.platforms ||
  definition.platforms.length === 0 ||
  definition.platforms.includes("react");

const getAllPropDefinitions = (kit?: PlaygroundKit) => ({
  ...(kit?.kit_schema?.props ?? {}),
  ...(kit?.playground_config?.customProps ?? {}),
});

const getAllPropDefinitionsWithGlobals = (
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => ({
  ...getAllPropDefinitions(kit),
  ...(kit?.kit_schema?.globalProps ? globalProps ?? {} : {}),
});

const acceptsChildren = (kit?: PlaygroundKit) => {
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

const getGroupedEditableProps = (kit?: PlaygroundKit) => {
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

const getGlobalProps = (
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => (kit?.kit_schema?.globalProps ? globalProps ?? {} : {});

const getStarterValue = (name: string, definition: PropDefinition) => {
  if (definition.default !== undefined) return definition.default;
  if (STARTER_VALUES[name] !== undefined) return STARTER_VALUES[name];

  const type = displayPropType(definition);
  if (definition.values?.length) return definition.values[0];
  if (type.includes("boolean")) return true;
  if (type.includes("number")) return 0;
  if (type.includes("array")) return [];
  if (type.includes("object") || type.includes("{")) return {};
  if (type.includes("function") || type.includes("=>")) return "() => undefined";
  return "";
};

const getDefaultDataPresetKey = (kit: PlaygroundKit) => {
  const presetKeys = Object.keys(kit.playground_config?.dataPresets?.presets ?? {});
  return presetKeys[0] ?? null;
};

const getDefaultStructureMode = (kit: PlaygroundKit) =>
  kit.playground_config?.structureModes?.default ?? null;

const getStructureModeConfig = (kit?: PlaygroundKit, structureMode?: string | null) =>
  structureMode ? kit?.playground_config?.structureModes?.modes?.[structureMode] : null;

const getDataPresetProps = (kit?: PlaygroundKit, dataPresetKey?: string | null) => {
  const preset = dataPresetKey
    ? kit?.playground_config?.dataPresets?.presets?.[dataPresetKey]
    : null;
  const props: Record<string, any> = {};

  if (preset?.columnDefinitions) props.columnDefinitions = preset.columnDefinitions;
  if (preset?.tableData) props.tableData = preset.tableData;

  return props;
};

const getRuntimeProps = (kit?: PlaygroundKit, dataPresetKey?: string | null) => ({
  ...(kit?.playground_config?.requiredProps ?? {}),
  ...getDataPresetProps(kit, dataPresetKey),
});

const getRequiredCodeProps = (kit?: PlaygroundKit, instance?: BuilderInstance) => {
  const props: Record<string, any> = {
    ...getRuntimeProps(kit, instance?.dataPresetKey),
  };

  kit?.playground_config?.requiredCodeProps?.forEach((name) => {
    const value = instance?.props[name] ?? kit.playground_config?.defaults?.[name];
    if (value !== undefined) props[name] = value;
  });

  return props;
};

const getStructureModeProps = (kit?: PlaygroundKit, structureMode?: string | null) =>
  getStructureModeConfig(kit, structureMode)?.props ?? {};

const isRuntimeProp = (
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

const getStarterProps = (
  kit: PlaygroundKit,
  dataPresetKey: string | null,
  structureMode: string | null
) => {
  const props: Record<string, any> = {
    ...(kit.playground_config?.defaults ?? {}),
    ...getRuntimeProps(kit, dataPresetKey),
    ...getStructureModeProps(kit, structureMode),
  };

  getEditableProps(kit).forEach(([name, definition]) => {
    if (props[name] === undefined) {
      props[name] = getStarterValue(name, definition);
    }
  });

  return props;
};

const createInstance = (kit: PlaygroundKit): BuilderInstance => {
  const dataPresetKey = getDefaultDataPresetKey(kit);
  const structureMode = getDefaultStructureMode(kit);

  return {
    id: `${kit.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kitName: kit.name,
    structureMode,
    dataPresetKey,
    props: getStarterProps(kit, dataPresetKey, structureMode),
    enabledProps: {},
    children: [],
  };
};

const formatJsObjectKey = (key: string) =>
  /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);

const formatCodeValue = (value: any, definition?: PropDefinition): string => {
  const type = displayPropType(definition);

  if (type.includes("function") || type.includes("=>")) {
    return typeof value === "string" && value.trim()
      ? value
      : "() => undefined";
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => formatCodeValue(item)).join(", ")}]`;
  }

  if (value instanceof Date) {
    return `new Date(${JSON.stringify(value.toISOString())})`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";

    return `{ ${entries
      .map(([key, entryValue]) => `${formatJsObjectKey(key)}: ${formatCodeValue(entryValue)}`)
      .join(", ")} }`;
  }

  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  if (value === undefined) return "undefined";
  return JSON.stringify(value);
};

const renderCodeProps = (
  instance: BuilderInstance,
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => {
  const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);
  const runtimeProps = {
    ...getRequiredCodeProps(kit, instance),
    ...getStructureModeProps(kit, instance.structureMode),
  };
  const propsForCode = {
    ...runtimeProps,
    ...Object.entries(instance.enabledProps)
      .filter(([, enabled]) => enabled)
      .reduce<Record<string, any>>((props, [name]) => {
        props[name] = instance.props[name];
        return props;
      }, {}),
  };

  return Object.entries(propsForCode)
    .map(([name, runtimeValue]) => {
      const value = instance.props[name] ?? runtimeValue;
      const definition = propDefinitions[name];
      if (value === "" || value === null || value === undefined) return null;

      if (typeof value === "boolean" && value === true) return name;
      if (typeof value === "string" && !displayPropType(definition).includes("function")) {
        return `${name}=${JSON.stringify(value)}`;
      }

      return `${name}={${formatCodeValue(value, definition)}}`;
    })
    .filter(Boolean)
    .join(" ");
};

const getInstancePropValues = (
  instance: BuilderInstance,
  kit?: PlaygroundKit
): Record<string, PropValue> => {
  const values: Record<string, PropValue> = {};

  Object.entries(getRequiredCodeProps(kit, instance)).forEach(([name, value]) => {
    values[name] = { value: instance.props[name] ?? value, enabled: true };
  });

  Object.entries(getStructureModeProps(kit, instance.structureMode)).forEach(([name, value]) => {
    values[name] = { value: instance.props[name] ?? value, enabled: true };
  });

  Object.entries(instance.enabledProps).forEach(([name, enabled]) => {
    if (!enabled) return;
    values[name] = { value: instance.props[name], enabled: true };
  });

  return values;
};

const getTemplateChildren = (
  instance: BuilderInstance,
  kit: PlaygroundKit | undefined,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) => {
  if (instance.children.length > 0) {
    return instance.children
      .map((child) => renderInstanceCode(child, kitsByName, 0, globalProps))
      .join("\n");
  }

  const mode = getStructureModeConfig(kit, instance.structureMode);
  return mode?.children ?? kit?.playground_config?.children?.default ?? "";
};

const getActiveTemplate = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  return mode?.template ?? kit?.playground_config?.template;
};

const getActivePropTargets = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  return {
    ...(kit?.playground_config?.propTargets ?? {}),
    ...(mode?.propTargets ?? {}),
  };
};

const getActivePropAliases = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  return {
    ...(kit?.playground_config?.propAliases ?? {}),
    ...(mode?.propAliases ?? {}),
  };
};

const getActiveImports = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  return mode?.imports ?? [];
};

const getActiveExternalImports = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  return [
    ...(kit?.playground_config?.externalImports ?? []),
    ...(mode?.externalImports ?? []),
  ];
};

const getActiveWrapper = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  return mode?.wrapper ?? kit?.playground_config?.wrapper;
};

const getRuntimeScope = (instance: BuilderInstance, kit?: PlaygroundKit) =>
  Object.entries(getRequiredCodeProps(kit, instance)).reduce<Record<string, any>>(
    (scope, [name, value]) => {
      scope[name] = instance.props[name] ?? value;
      return scope;
    },
    {}
  );

const shouldApplySyncValue = (value: any) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return true;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== undefined && value !== null && value !== "";
};

const getRequiredPropNames = (kit?: PlaygroundKit, instance?: BuilderInstance) => {
  const names = new Set<string>();
  if (!instance) return names;

  Object.keys(getRequiredCodeProps(kit, instance)).forEach((name) => names.add(name));
  Object.keys(getStructureModeProps(kit, instance.structureMode)).forEach((name) => names.add(name));

  return names;
};

const getPropValue = (
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

const shouldUseTemplatePreview = (instance: BuilderInstance, kit?: PlaygroundKit) =>
  Boolean(
    getActiveTemplate(instance, kit) &&
    (TEMPLATE_PREVIEW_KITS.has(instance.kitName) || getActiveWrapper(instance, kit))
  );

const getLivePreviewCode = (
  instance: BuilderInstance,
  kit: PlaygroundKit,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) =>
  generateLiveFromTemplate({
    template: getActiveTemplate(instance, kit)!,
    propValues: getInstancePropValues(instance, kit),
    propDefinitions: getAllPropDefinitionsWithGlobals(kit, globalProps) as any,
    propTargets: getActivePropTargets(instance, kit),
    propAliases: getActivePropAliases(instance, kit),
    children: getTemplateChildren(instance, kit, kitsByName, globalProps),
    childrenConfig: kit.playground_config?.children,
    customImports: getActiveImports(instance, kit),
    externalImports: getActiveExternalImports(instance, kit),
    wrapper: getActiveWrapper(instance, kit),
    requiredProps: getRequiredCodeProps(kit, instance),
  });

const collectImportNames = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  names = new Set<string>()
) => {
  instances.forEach((instance) => {
    const componentName = kitsByName[instance.kitName]?.kit_schema?.name;
    if (componentName) names.add(componentName);
    collectImportNames(instance.children, kitsByName, names);
  });

  return names;
};

const renderInstanceCode = (
  instance: BuilderInstance,
  kitsByName: Record<string, PlaygroundKit>,
  depth: number,
  globalProps?: Record<string, PropDefinition>
): string => {
  const kit = kitsByName[instance.kitName];
  const componentName = kit?.kit_schema?.name ?? "Card";
  const props = renderCodeProps(instance, kit, globalProps);
  const propString = props ? ` ${props}` : "";
  const pad = "  ".repeat(depth);

  if (instance.children.length === 0) {
    return `${pad}<${componentName}${propString} />`;
  }

  const children = instance.children
    .map((child) => renderInstanceCode(child, kitsByName, depth + 1, globalProps))
    .join("\n");

  return `${pad}<${componentName}${propString}>\n${children}\n${pad}</${componentName}>`;
};

const hasTemplateBackedInstance = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>
): boolean =>
  instances.some((instance) => {
    const kit = kitsByName[instance.kitName];
    return (
      Boolean(kit && shouldUseTemplatePreview(instance, kit)) ||
      hasTemplateBackedInstance(instance.children, kitsByName)
    );
  });

const renderDisplayInstanceCode = (
  instance: BuilderInstance,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) => {
  const kit = kitsByName[instance.kitName];

  if (kit && shouldUseTemplatePreview(instance, kit)) {
    return generateFromTemplate({
      template: getActiveTemplate(instance, kit)!,
      propValues: getInstancePropValues(instance, kit),
      propDefinitions: getAllPropDefinitionsWithGlobals(kit, globalProps) as any,
      propTargets: getActivePropTargets(instance, kit),
      propAliases: getActivePropAliases(instance, kit),
      children: getTemplateChildren(instance, kit, kitsByName, globalProps),
      childrenConfig: kit.playground_config?.children,
      includeImport: true,
      customImports: getActiveImports(instance, kit),
      externalImports: getActiveExternalImports(instance, kit),
      wrapper: getActiveWrapper(instance, kit),
      requiredProps: getRequiredCodeProps(kit, instance),
    });
  }

  const imports = Array.from(collectImportNames([instance], kitsByName)).sort();
  return `import { ${imports.length ? imports.join(", ") : "Card"} } from "playbook-ui";

${renderInstanceCode(instance, kitsByName, 0, globalProps)}`;
};

const generateCode = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) => {
  if (hasTemplateBackedInstance(instances, kitsByName)) {
    return instances.length === 0
      ? "/* Add kits to start composing. */"
      : instances.map((instance) => renderDisplayInstanceCode(instance, kitsByName, globalProps)).join("\n\n");
  }

  const imports = Array.from(collectImportNames(instances, kitsByName)).sort();
  const renderedInstances = instances.length === 0
    ? "    {/* Add kits to start composing. */}"
    : instances
        .map((instance) => renderInstanceCode(instance, kitsByName, 2, globalProps))
        .join("\n");

  return `import React from "react";
import { ${imports.length ? imports.join(", ") : "Card"} } from "playbook-ui";

export const PlaygroundComposition = () => (
  <div className="playground-composition">
${renderedInstances}
  </div>
);`;
};

const countInstances = (instances: BuilderInstance[]): number =>
  instances.reduce((count, instance) => count + 1 + countInstances(instance.children), 0);

const findInstance = (
  instances: BuilderInstance[],
  id: string | null
): BuilderInstance | undefined => {
  if (!id) return undefined;

  for (const instance of instances) {
    if (instance.id === id) return instance;
    const found = findInstance(instance.children, id);
    if (found) return found;
  }

  return undefined;
};

const updateInstanceInTree = (
  instances: BuilderInstance[],
  id: string,
  updater: (instance: BuilderInstance) => BuilderInstance
): BuilderInstance[] =>
  instances.map((instance) => {
    if (instance.id === id) return updater(instance);

    return {
      ...instance,
      children: updateInstanceInTree(instance.children, id, updater),
    };
  });

const removeInstanceFromTree = (
  instances: BuilderInstance[],
  id: string
): BuilderInstance[] =>
  instances
    .filter((instance) => instance.id !== id)
    .map((instance) => ({
      ...instance,
      children: removeInstanceFromTree(instance.children, id),
    }));

const moveInstanceInTree = (
  instances: BuilderInstance[],
  id: string,
  direction: -1 | 1
): BuilderInstance[] => {
  const index = instances.findIndex((instance) => instance.id === id);

  if (index >= 0) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= instances.length) return instances;

    const next = [...instances];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    return next;
  }

  return instances.map((instance) => ({
    ...instance,
    children: moveInstanceInTree(instance.children, id, direction),
  }));
};

const buildTargetOptions = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  depth = 0
): TargetOption[] =>
  instances.flatMap((instance) => {
    const kit = kitsByName[instance.kitName];
    const childOptions = buildTargetOptions(instance.children, kitsByName, depth + 1);

    if (!acceptsChildren(kit)) return childOptions;

    return [
      {
        id: instance.id,
        label: `${"--".repeat(depth)}${depth ? " " : ""}${kit?.label ?? instance.kitName}`,
      },
      ...childOptions,
    ];
  });

const buildInstanceOptions = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  depth = 0
): TargetOption[] =>
  instances.flatMap((instance, index) => {
    const kit = kitsByName[instance.kitName];
    const label = `${"--".repeat(depth)}${depth ? " " : ""}${kit?.label ?? instance.kitName} ${
      index + 1
    }`;

    return [
      { id: instance.id, label },
      ...buildInstanceOptions(instance.children, kitsByName, depth + 1),
    ];
  });

const getDataPresetOptions = (kit?: PlaygroundKit) =>
  Object.entries(kit?.playground_config?.dataPresets?.presets ?? {}).map(([key, preset]) => ({
    key,
    label: preset.label ?? key,
  }));

const getStructureModeOptions = (kit?: PlaygroundKit) =>
  Object.entries(kit?.playground_config?.structureModes?.modes ?? {}).map(([key, mode]) => ({
    key,
    label: mode.label ?? key,
  }));

class RenderBoundary extends React.Component<
  { children: React.ReactNode; fallback: (error?: Error) => React.ReactNode },
  { error?: Error; hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ error: undefined, hasError: false });
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback(this.state.error) : this.props.children;
  }
}

const getRenderableValue = (
  name: string,
  value: any,
  propDefinitions: Record<string, PropDefinition>
) => {
  const type = displayPropType(propDefinitions[name]);
  if (value === "" || value === null || value === undefined) return undefined;
  return type.includes("function") || type.includes("=>")
    ? () => undefined
    : value;
};

const getRenderableProps = (
  instance: BuilderInstance,
  kit?: PlaygroundKit,
  globalProps?: Record<string, PropDefinition>
) => {
  const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);
  const props: Record<string, any> = {};

  Object.entries(kit?.playground_config?.defaults ?? {}).forEach(([name, value]) => {
    const renderableValue = getRenderableValue(name, value, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  Object.entries(getRuntimeProps(kit, instance.dataPresetKey)).forEach(([name, value]) => {
    const currentValue = instance.props[name] ?? value;
    const renderableValue = getRenderableValue(name, currentValue, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  Object.entries(getStructureModeProps(kit, instance.structureMode)).forEach(([name, value]) => {
    const currentValue = instance.props[name] ?? value;
    const renderableValue = getRenderableValue(name, currentValue, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  Object.entries(instance.enabledProps).forEach(([name, enabled]) => {
    if (!enabled) return;

    const value = instance.props[name];
    const renderableValue = getRenderableValue(name, value, propDefinitions);
    if (renderableValue !== undefined) props[name] = renderableValue;
  });

  return props;
};

const BuilderPreviewItem = ({
  globalProps,
  instance,
  isSelected,
  kitsByName,
  onSelect,
  selectedId,
}: {
  globalProps?: Record<string, PropDefinition>;
  instance: BuilderInstance;
  isSelected: boolean;
  kitsByName: Record<string, PlaygroundKit>;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) => {
  const kit = kitsByName[instance.kitName];
  const Component = kit?.kit_schema?.name
    ? (Playbook as any)[kit.kit_schema.name]
    : null;
  const childNodes = instance.children.map((child) => (
    <BuilderPreviewItem
      globalProps={globalProps}
      instance={child}
      isSelected={child.id === selectedId}
      key={child.id}
      kitsByName={kitsByName}
      onSelect={onSelect}
      selectedId={selectedId}
    />
  ));
  const canRenderChildren = acceptsChildren(kit);

  const rendered = kit && shouldUseTemplatePreview(instance, kit) ? (
    <PlaygroundPreview
      bare
      code={getLivePreviewCode(instance, kit, kitsByName, globalProps)}
      extraScope={getRuntimeScope(instance, kit)}
    />
  ) : Component ? (
    <RenderBoundary
      fallback={(error) => (
        <Card padding="sm">
          <Body text={error?.message ?? `${kit?.label ?? instance.kitName} needs more props to render.`} />
        </Card>
      )}
    >
      {React.createElement(
        Component,
        getRenderableProps(instance, kit, globalProps),
        canRenderChildren && childNodes.length > 0 ? childNodes : undefined
      )}
    </RenderBoundary>
  ) : (
    <Card padding="sm">
      <Body text={`${kit?.label ?? instance.kitName} is not exported by playbook-ui.`} />
    </Card>
  );

  return (
    <div
      className={`builder-instance ${isSelected ? "is-selected" : ""} ${
        canRenderChildren && instance.children.length === 0 ? "is-empty-container" : ""
      }`}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(instance.id);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onSelect(instance.id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="builder-instance-render">{rendered}</div>
    </div>
  );
};

const PropEditor = ({
  disableToggle = false,
  definition,
  enabled,
  name,
  onEnabledChange,
  onValueChange,
  value,
}: {
  disableToggle?: boolean;
  definition: PropDefinition;
  enabled: boolean;
  name: string;
  onEnabledChange: (enabled: boolean) => void;
  onValueChange: (value: any) => void;
  value: any;
}) => {
  const type = displayPropType(definition);

  const input = (() => {
    if (definition.values?.length) {
      return (
        <select
          disabled={!enabled}
          onChange={(event) => onValueChange(event.target.value)}
          value={value ?? ""}
        >
          {definition.values.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (type.includes("boolean")) {
      return (
        <label className="builder-checkbox-row">
          <input
            checked={Boolean(value)}
            disabled={!enabled}
            onChange={(event) => onValueChange(event.target.checked)}
            type="checkbox"
          />
          <span>{Boolean(value) ? "true" : "false"}</span>
        </label>
      );
    }

    if (type.includes("object") || type.includes("array") || type.includes("{")) {
      return (
        <textarea
          disabled={!enabled}
          onChange={(event) => {
            try {
              onValueChange(JSON.parse(event.target.value));
            } catch {
              onValueChange(event.target.value);
            }
          }}
          value={
            typeof value === "string"
              ? value
              : JSON.stringify(value ?? (type.includes("array") ? [] : {}), null, 2)
          }
        />
      );
    }

    return (
      <input
        disabled={!enabled}
        onChange={(event) =>
          onValueChange(type.includes("number") ? Number(event.target.value) : event.target.value)
        }
        type={type.includes("number") ? "number" : "text"}
        value={value ?? ""}
      />
    );
  })();

  return (
    <div className="builder-prop-row">
      <label className="builder-prop-toggle">
        <input
          checked={enabled}
          disabled={disableToggle}
          onChange={(event) => onEnabledChange(event.target.checked)}
          type="checkbox"
        />
        <span>{name}</span>
      </label>
      <Caption color="lighter" text={definition.type ?? "string"} />
      {input}
    </div>
  );
};

export default function Playground() {
  const {
    global_props_schema,
    playground_kits = [],
  } = useLoaderData() as PlaygroundLoaderData;
  const [instances, setInstances] = useState<BuilderInstance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addTargetId, setAddTargetId] = useState(ROOT_TARGET_ID);

  const kitsByName = useMemo(() => {
    return playground_kits.reduce<Record<string, PlaygroundKit>>((acc, kit) => {
      acc[kit.name] = kit;
      return acc;
    }, {});
  }, [playground_kits]);

  const filteredKits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return playground_kits;

    return playground_kits.filter((kit) =>
      [kit.name, kit.label, kit.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [playground_kits, searchQuery]);

  const kitsByCategory = useMemo(() => {
    return filteredKits.reduce<Record<string, PlaygroundKit[]>>((acc, kit) => {
      if (!acc[kit.category]) acc[kit.category] = [];
      acc[kit.category].push(kit);
      return acc;
    }, {});
  }, [filteredKits]);

  const selectedInstance = findInstance(instances, selectedId);
  const selectedKit = selectedInstance ? kitsByName[selectedInstance.kitName] : undefined;
  const selectedDataPresetOptions = getDataPresetOptions(selectedKit);
  const selectedStructureModeOptions = getStructureModeOptions(selectedKit);
  const selectedGlobalProps = getGlobalProps(selectedKit, global_props_schema?.props);
  const selectedRequiredPropNames = getRequiredPropNames(selectedKit, selectedInstance);
  const targetOptions = useMemo(
    () => [
      { id: ROOT_TARGET_ID, label: "Main canvas" },
      ...buildTargetOptions(instances, kitsByName),
    ],
    [instances, kitsByName]
  );
  const instanceOptions = useMemo(
    () => buildInstanceOptions(instances, kitsByName),
    [instances, kitsByName]
  );
  const activeAddTargetId = targetOptions.some((option) => option.id === addTargetId)
    ? addTargetId
    : ROOT_TARGET_ID;
  const generatedCode = generateCode(instances, kitsByName, global_props_schema?.props);
  const instanceCount = countInstances(instances);

  const updateInstance = (id: string, updater: (instance: BuilderInstance) => BuilderInstance) => {
    setInstances((current) => updateInstanceInTree(current, id, updater));
  };

  const handleSelectInstance = (id: string) => {
    const instance = findInstance(instances, id);
    const kit = instance ? kitsByName[instance.kitName] : undefined;

    setSelectedId(id);
    if (acceptsChildren(kit)) {
      setAddTargetId(id);
    }
  };

  const addKit = (kit: PlaygroundKit) => {
    const nextInstance = createInstance(kit);

    if (activeAddTargetId === ROOT_TARGET_ID) {
      setInstances((current) => [...current, nextInstance]);
    } else {
      setInstances((current) =>
        updateInstanceInTree(current, activeAddTargetId, (instance) => ({
          ...instance,
          children: [...instance.children, nextInstance],
        }))
      );
    }

    setSelectedId(nextInstance.id);
    if (acceptsChildren(kit)) {
      setAddTargetId(nextInstance.id);
    }
  };

  const removeSelected = () => {
    if (!selectedInstance) return;

    setInstances((current) => removeInstanceFromTree(current, selectedInstance.id));
    setSelectedId(null);
    if (addTargetId === selectedInstance.id) setAddTargetId(ROOT_TARGET_ID);
  };

  const moveSelected = (direction: -1 | 1) => {
    if (!selectedInstance) return;
    setInstances((current) => moveInstanceInTree(current, selectedInstance.id, direction));
  };

  const handlePropChange = (name: string, value: PropValue) => {
    if (!selectedInstance || !selectedKit) return;
    const syncRule = selectedKit.playground_config?.propSyncOnEnable?.[name];
    const shouldSync = value.enabled && syncRule && shouldApplySyncValue(value.value);

    updateInstance(selectedInstance.id, (instance) => {
      const dataPresetKey = shouldSync
        ? syncRule?.dataPreset ?? instance.dataPresetKey
        : instance.dataPresetKey;
      const structureMode = shouldSync
        ? syncRule?.structureMode ?? instance.structureMode
        : instance.structureMode;
      const requiredProp = isRuntimeProp(selectedKit, instance, name);

      return {
        ...instance,
        dataPresetKey,
        structureMode,
        props: {
          ...instance.props,
          ...(shouldSync ? getRuntimeProps(selectedKit, dataPresetKey) : {}),
          ...(shouldSync ? getStructureModeProps(selectedKit, structureMode) : {}),
          [name]: value.value,
        },
        enabledProps: {
          ...instance.enabledProps,
          [name]: requiredProp ? true : value.enabled,
        },
      };
    });
  };

  return (
    <PageContainer marginTop="md">
      <Flex className="full-playground" orientation="column" width="100%">
        <Flex className="full-playground-heading" justify="between" align="end" gap="md">
          <Flex orientation="column" gap="xs">
            <Caption color="lighter" text={`${playground_kits.length} configured playground kits`} />
            <Title size={1} text="Playground" />
            <Body
              color="light"
              text="Build a UI by adding kits to the canvas, nesting kits inside children, and editing props."
            />
          </Flex>
          <Button
            icon="trash"
            onClick={() => {
              setInstances([]);
              setSelectedId(null);
              setAddTargetId(ROOT_TARGET_ID);
            }}
            text="Clear"
            variant="secondary"
          />
        </Flex>

        <div className="full-playground-workbench">
          <div className="full-playground-left">
            <Card padding="md">
              <Title marginBottom="sm" size={4} text="Add Kits" />
              <label className="builder-field">
                <span>Add to</span>
                <select
                  onChange={(event) => setAddTargetId(event.target.value)}
                  value={activeAddTargetId}
                >
                  {targetOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <TextInput
                label="Search kits"
                name="playgroundKitSearch"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setSearchQuery((event.target as HTMLInputElement).value)
                }
                placeholder="Search configured kits"
                value={searchQuery}
              />
              <div className="builder-kit-list">
                {Object.entries(kitsByCategory).map(([category, kits]) => (
                  <div key={category}>
                    <Caption color="lighter" text={category} />
                    {kits.map((kit) => (
                      <button
                        className="builder-kit-button"
                        key={kit.name}
                        onClick={() => addKit(kit)}
                        type="button"
                      >
                        <Flex align="center" gap="sm">
                          <Icon icon="plus" />
                          <Flex orientation="column" align="start">
                            <Body text={kit.label} />
                            <Caption color="lighter" text={formatKitName(kit.name)} />
                          </Flex>
                        </Flex>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="full-playground-center">
            <Card className="full-playground-canvas" padding="md">
              <Flex justify="between" align="center" marginBottom="md">
                <Title size={3} text="Demo" />
                <Badge text={`${instanceCount} kits`} variant="primary" />
              </Flex>
              <div className="builder-stage" onClick={() => setSelectedId(null)}>
                {instances.length === 0 ? (
                  <div className="builder-empty-canvas">
                    <Icon icon="plus" />
                    <Body color="light" text="Add a kit to start composing." />
                  </div>
                ) : (
                  instances.map((instance) => (
                    <BuilderPreviewItem
                      globalProps={global_props_schema?.props}
                      instance={instance}
                      isSelected={instance.id === selectedId}
                      key={instance.id}
                      kitsByName={kitsByName}
                      onSelect={handleSelectInstance}
                      selectedId={selectedId}
                    />
                  ))
                )}
              </div>
            </Card>

            <div className="full-playground-code-panel">
              <CodePanel code={generatedCode} />
            </div>
          </div>

          <div className="full-playground-right">
            <Card padding="md">
              <Title marginBottom="sm" size={4} text="Inspector" />
              {instanceOptions.length > 0 && (
                <label className="builder-field">
                  <span>Selected kit</span>
                  <select
                    onChange={(event) => {
                      const id = event.target.value;
                      if (id) handleSelectInstance(id);
                      else setSelectedId(null);
                    }}
                    value={selectedId ?? ""}
                  >
                    <option value="">Choose a placed kit</option>
                    {instanceOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {!selectedInstance || !selectedKit ? (
                <Body
                  color="light"
                  text={
                    instanceOptions.length > 0
                      ? "Choose a placed kit to edit props and order."
                      : "Add a kit to start editing props and order."
                  }
                />
              ) : (
                <Flex orientation="column" gap="sm">
                  <Flex justify="between" align="center">
                    <Flex orientation="column">
                      <Detail color="light" text="Editing" />
                      <Body text={selectedKit.label} />
                    </Flex>
                    <Button
                      icon="trash"
                      onClick={removeSelected}
                      size="sm"
                      text="Remove"
                      variant="secondary"
                    />
                  </Flex>

                  {acceptsChildren(selectedKit) && (
                    <Button
                      icon="plus"
                      onClick={() => setAddTargetId(selectedInstance.id)}
                      size="sm"
                      text="Add kits inside this"
                      variant="secondary"
                    />
                  )}

                  {selectedDataPresetOptions.length > 0 && (
                    <label className="builder-field">
                      <span>Data</span>
                      <select
                        onChange={(event) => {
                          const dataPresetKey = event.target.value || null;

                          updateInstance(selectedInstance.id, (instance) => ({
                            ...instance,
                            dataPresetKey,
                            props: {
                              ...instance.props,
                              ...getRuntimeProps(selectedKit, dataPresetKey),
                            },
                          }));
                        }}
                        value={selectedInstance.dataPresetKey ?? ""}
                      >
                        {selectedDataPresetOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}

                  {selectedStructureModeOptions.length > 1 && (
                    <label className="builder-field">
                      <span>Structure</span>
                      <select
                        onChange={(event) => {
                          const structureMode = event.target.value || null;

                          updateInstance(selectedInstance.id, (instance) => ({
                            ...instance,
                            structureMode,
                            props: {
                              ...instance.props,
                              ...getStructureModeProps(selectedKit, structureMode),
                            },
                          }));
                        }}
                        value={selectedInstance.structureMode ?? ""}
                      >
                        {selectedStructureModeOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}

                  <Flex gap="xs">
                    <Button
                      icon="arrow-up"
                      onClick={() => moveSelected(-1)}
                      size="sm"
                      text="Up"
                      variant="secondary"
                    />
                    <Button
                      icon="arrow-down"
                      onClick={() => moveSelected(1)}
                      size="sm"
                      text="Down"
                      variant="secondary"
                    />
                  </Flex>

                  <div className="builder-prop-list">
                    {getGroupedEditableProps(selectedKit).map((group) => (
                      <div className="builder-prop-group" key={group.name || "props"}>
                        {group.name && <Title size={4} text={group.name} />}
                        {group.props.map(([name, definition]) => (
                          <PropControl
                            definition={definition as any}
                            isRequired={selectedRequiredPropNames.has(name)}
                            key={name}
                            name={name}
                            onChange={handlePropChange}
                            value={getPropValue(selectedInstance, selectedKit, name)}
                          />
                        ))}
                      </div>
                    ))}

                    {Object.keys(selectedGlobalProps).length > 0 && (
                      <div className="builder-prop-group">
                        <Title size={4} text="Global Props" />
                        {Object.entries(selectedGlobalProps).map(([name, definition]) => (
                          <PropControl
                            definition={definition as any}
                            key={name}
                            name={name}
                            onChange={handlePropChange}
                            value={getPropValue(selectedInstance, selectedKit, name)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Flex>
              )}
            </Card>
          </div>
        </div>
      </Flex>
    </PageContainer>
  );
}
