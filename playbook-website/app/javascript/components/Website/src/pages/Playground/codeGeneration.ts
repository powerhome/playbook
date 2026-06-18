import type { PropValue } from "../KitShow/Tabs/Playground";
import {
  generateFromTemplate,
  generateLiveFromTemplate,
} from "../KitShow/Tabs/Playground";
import {
  getAllPropDefinitionsWithGlobals,
  getDataPresetProps,
  getFirstPreset,
  getInitialDataPresetKey,
  getRequiredCodeProps,
  getRuntimeProps,
  getStructureModeConfig,
  getStructureModeProps,
  displayPropType,
} from "./kitUtils";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "./types";

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

export const getInstancePropValues = (
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
  globalProps?: Record<string, PropDefinition>,
  context?: CodeRenderContext
) => {
  if (instance.children.length > 0) {
    return instance.children
      .map((child) => renderInstanceCode(child, kitsByName, 0, globalProps, context))
      .join("\n");
  }

  const mode = getStructureModeConfig(kit, instance.structureMode);
  return instance.configuredChildren ?? mode?.children ?? kit?.playground_config?.children?.default ?? "";
};

export const getActiveTemplate = (instance: BuilderInstance, kit?: PlaygroundKit) => {
  const mode = getStructureModeConfig(kit, instance.structureMode);
  const template = mode?.template ?? kit?.playground_config?.template;
  if (!template) return template;

  const wrapperMatch = template
    .trim()
    .match(/^<div className="flex-doc-example">\s*([\s\S]*?)\s*<\/div>$/);

  return wrapperMatch ? wrapperMatch[1] : template;
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

export const getRuntimeScope = (
  instance: BuilderInstance,
  kit: PlaygroundKit | undefined,
  kitsByName: Record<string, PlaygroundKit>
) => {
  const propValues = kit ? getInstancePropValues(instance, kit) : {};
  const requiredProps = getRequiredCodeProps(kit, instance);
  const ownScope = kit
    ? getTemplateVariableValues(kit, instance, propValues, requiredProps)
    : requiredProps;
  const scope = Object.entries(ownScope).reduce<Record<string, any>>(
    (scopedValues, [name, value]) => {
      scopedValues[name] = instance.props[name] ?? propValues[name]?.value ?? value;
      return scopedValues;
    },
    {}
  );

  instance.children.forEach((child) => {
    Object.assign(scope, getRuntimeScope(child, kitsByName[child.kitName], kitsByName));
  });

  return scope;
};

export const shouldUseTemplatePreview = (instance: BuilderInstance, kit?: PlaygroundKit) =>
  instance.children.length === 0 && Boolean(getActiveTemplate(instance, kit));

export const getLivePreviewCode = (
  instance: BuilderInstance,
  kit: PlaygroundKit,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) => {
  const context: CodeRenderContext = {
    includeRequiredVariableDefinitions: false,
    setupSnippets: [],
    usedSetupNames: new Set(),
  };
  const liveCode = generateLiveFromTemplate({
    template: getActiveTemplate(instance, kit)!,
    propValues: getInstancePropValues(instance, kit),
    propDefinitions: getAllPropDefinitionsWithGlobals(kit, globalProps) as any,
    propTargets: getActivePropTargets(instance, kit),
    propAliases: getActivePropAliases(instance, kit),
    children: getTemplateChildren(instance, kit, kitsByName, globalProps, context),
    childrenConfig: kit.playground_config?.children,
    customImports: getActiveImports(instance, kit),
    externalImports: getActiveExternalImports(instance, kit),
    wrapper: getActiveWrapper(instance, kit),
    requiredProps: getRequiredCodeProps(kit, instance),
  });
  const setupCode = context.setupSnippets.join("\n\n");

  return [setupCode, liveCode].filter(Boolean).join("\n\n");
};

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

type CodeRenderContext = {
  includeRequiredVariableDefinitions?: boolean;
  setupSnippets: string[];
  usedSetupNames: Set<string>;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const findTopLevelJsxStart = (code: string) => {
  let braceDepth = 0;
  let bracketDepth = 0;
  let parenDepth = 0;
  let quote: "'" | "\"" | "`" | null = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < code.length; index += 1) {
    const char = code[index];
    const next = code[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === "'" || char === "\"" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") braceDepth += 1;
    if (char === "}") braceDepth = Math.max(0, braceDepth - 1);
    if (char === "[") bracketDepth += 1;
    if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);
    if (char === "(") parenDepth += 1;
    if (char === ")") parenDepth = Math.max(0, parenDepth - 1);

    if (
      char === "<" &&
      braceDepth === 0 &&
      bracketDepth === 0 &&
      parenDepth === 0 &&
      next &&
      /[A-Za-z]/.test(next)
    ) {
      return index;
    }
  }

  return -1;
};

const splitSetupFromRenderableCode = (code: string) => {
  const trimmed = code.trim();
  const trailingInvocation = trimmed.match(/\n(<[A-Za-z_][\w.]*\s*\/>)\s*$/);

  if (trailingInvocation?.index !== undefined) {
    return {
      setup: trimmed.slice(0, trailingInvocation.index).trim(),
      renderable: trailingInvocation[1].trim(),
    };
  }

  const jsxStart = findTopLevelJsxStart(trimmed);

  if (jsxStart < 0) {
    return { setup: trimmed, renderable: "" };
  }

  return {
    setup: trimmed.slice(0, jsxStart).trim(),
    renderable: trimmed.slice(jsxStart).trim(),
  };
};

const getTopLevelDeclarationNames = (code: string) =>
  [
    ...code.matchAll(/^(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/gm),
  ].map((match) => match[1]);

const makeSetupDeclarationsUnique = (
  setup: string,
  renderable: string,
  context: CodeRenderContext
) => {
  let nextSetup = setup;
  let nextRenderable = renderable;

  getTopLevelDeclarationNames(setup).forEach((name) => {
    let nextName = name;
    let suffix = 2;

    while (context.usedSetupNames.has(nextName)) {
      nextName = `${name}${suffix}`;
      suffix += 1;
    }

    context.usedSetupNames.add(nextName);

    if (nextName === name) return;

    const namePattern = new RegExp(`\\b${escapeRegExp(name)}\\b`, "g");
    nextSetup = nextSetup.replace(namePattern, nextName);
    nextRenderable = nextRenderable.replace(namePattern, nextName);
  });

  return { setup: nextSetup, renderable: nextRenderable };
};

const appendSetupSnippet = (
  code: string,
  context?: CodeRenderContext
) => {
  if (!context) return splitSetupFromRenderableCode(code);

  const split = splitSetupFromRenderableCode(code);
  if (!split.setup) return split;

  const unique = makeSetupDeclarationsUnique(split.setup, split.renderable, context);
  if (unique.setup) context.setupSnippets.push(unique.setup);

  return { setup: "", renderable: unique.renderable };
};

const templateReferencesName = (template: string | undefined, name: string) =>
  Boolean(template && new RegExp(`\\b${escapeRegExp(name)}\\b(?!\\s*=)`).test(template));

const hasTopLevelDeclaration = (code: string, name: string) =>
  new RegExp(`^(?:const|let|var|function)\\s+${escapeRegExp(name)}\\b`, "m").test(code);

const buildRequiredVariableDefinitions = (
  variableValues: Record<string, any>,
  propValues: Record<string, PropValue>,
  template: string | undefined,
  wrapper: string | undefined,
  existingSetup: string
) => {
  const source = `${template ?? ""}\n${wrapper ?? ""}`;

  return Object.entries(variableValues)
    .filter(([name]) => templateReferencesName(source, name))
    .filter(([name]) => !hasTopLevelDeclaration(existingSetup, name))
    .map(([name, value]) => {
      const currentValue = propValues[name]?.value ?? value;
      return `const ${name} = ${JSON.stringify(currentValue, null, 2)};`;
    })
    .join("\n\n");
};

const getTemplateVariableValues = (
  kit: PlaygroundKit,
  instance: BuilderInstance,
  propValues: Record<string, PropValue>,
  requiredProps: Record<string, any>
) => {
  const activeDataPresetProps = getDataPresetProps(kit, instance.dataPresetKey);
  const fallbackDataPresetProps = Object.keys(activeDataPresetProps).length > 0
    ? {}
    : getDataPresetProps(kit, getInitialDataPresetKey(kit));
  const values: Record<string, any> = {
    ...(kit.playground_config?.requiredProps ?? {}),
    ...fallbackDataPresetProps,
    ...activeDataPresetProps,
    ...requiredProps,
  };

  Object.entries(propValues).forEach(([name, propValue]) => {
    if (values[name] === undefined) values[name] = propValue.value;
  });

  Object.entries(instance.props).forEach(([name, value]) => {
    if (values[name] === undefined) values[name] = value;
  });

  return values;
};

const getLiveTemplatePropValues = (
  propValues: Record<string, PropValue>,
  requiredProps: Record<string, any>,
  template: string | undefined,
  wrapper: string | undefined
) => {
  const requiredVariableNames = new Set(
    Object.keys(requiredProps).filter((name) =>
      templateReferencesName(`${template ?? ""}\n${wrapper ?? ""}`, name)
    )
  );

  return Object.entries(propValues).reduce<Record<string, PropValue>>(
    (values, [name, propValue]) => {
      if (!requiredVariableNames.has(name)) values[name] = propValue;
      return values;
    },
    {}
  );
};

const renderInstanceCode = (
  instance: BuilderInstance,
  kitsByName: Record<string, PlaygroundKit>,
  depth: number,
  globalProps?: Record<string, PropDefinition>,
  context?: CodeRenderContext
): string => {
  const kit = kitsByName[instance.kitName];
  if (kit && getActiveTemplate(instance, kit)) {
    const template = getActiveTemplate(instance, kit)!;
    const propValues = getInstancePropValues(instance, kit);
    const wrapper = getActiveWrapper(instance, kit);
    const requiredProps = getRequiredCodeProps(kit, instance);
    const isLivePreviewRender = context?.includeRequiredVariableDefinitions === false;
    const rendered = generateFromTemplate({
      template,
      propValues: isLivePreviewRender
        ? getLiveTemplatePropValues(propValues, requiredProps, template, wrapper)
        : propValues,
      propDefinitions: getAllPropDefinitionsWithGlobals(kit, globalProps) as any,
      propTargets: getActivePropTargets(instance, kit),
      propAliases: getActivePropAliases(instance, kit),
      children: getTemplateChildren(instance, kit, kitsByName, globalProps, context),
      childrenConfig: kit.playground_config?.children,
      includeImport: false,
      customImports: getActiveImports(instance, kit),
      externalImports: getActiveExternalImports(instance, kit),
      wrapper,
      requiredProps: isLivePreviewRender ? {} : requiredProps,
    });

    const split = splitSetupFromRenderableCode(rendered);
    let renderable = split.renderable;
    const requiredVariableDefinitions = isLivePreviewRender
      ? ""
      : buildRequiredVariableDefinitions(
          getTemplateVariableValues(kit, instance, propValues, requiredProps),
          propValues,
          template,
          wrapper,
          split.setup
        );
    const setup = [requiredVariableDefinitions, split.setup].filter(Boolean).join("\n\n");

    if (context && setup) {
      const unique = makeSetupDeclarationsUnique(setup, renderable, context);
      context.setupSnippets.push(unique.setup);
      renderable = unique.renderable;
    } else if (!context) {
      renderable = appendSetupSnippet(rendered, context).renderable;
    }

    const pad = "  ".repeat(depth);
    return renderable
      .split("\n")
      .map((line) => (line ? `${pad}${line}` : line))
      .join("\n");
  }

  const componentName = kit?.kit_schema?.name ?? "Card";
  const props = renderCodeProps(instance, kit, globalProps);
  const propString = props ? ` ${props}` : "";
  const pad = "  ".repeat(depth);
  const configuredChildren = instance.configuredChildren?.trim();

  if (instance.children.length === 0 && !configuredChildren) {
    return `${pad}<${componentName}${propString} />`;
  }

  const children =
    instance.children.length > 0
      ? instance.children
          .map((child) => renderInstanceCode(child, kitsByName, depth + 1, globalProps, context))
          .join("\n")
      : configuredChildren!
          .split("\n")
          .map((line) => `${"  ".repeat(depth + 1)}${line}`)
          .join("\n");

  return `${pad}<${componentName}${propString}>\n${children}\n${pad}</${componentName}>`;
};

const collectActivePlaybookImports = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  names = new Set<string>()
) => {
  instances.forEach((instance) => {
    const kit = kitsByName[instance.kitName];
    getActiveImports(instance, kit).forEach((name) => names.add(name));
    collectActivePlaybookImports(instance.children, kitsByName, names);
  });

  return names;
};

const collectExternalImportStatements = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  statements = new Set<string>()
) => {
  instances.forEach((instance) => {
    const kit = kitsByName[instance.kitName];
    getActiveExternalImports(instance, kit).forEach((statement) => {
      if (!/^import\s+React\b/.test(statement.trim())) statements.add(statement);
    });
    collectExternalImportStatements(instance.children, kitsByName, statements);
  });

  return statements;
};

const collectLocalDeclarationNames = (code: string) =>
  new Set(getTopLevelDeclarationNames(code));

const collectComponentNamesFromCode = (code: string) =>
  [...code.matchAll(/<([A-Z][A-Za-z0-9.]*)/g)].map((match) => match[1].split(".")[0]);

const formatPlaybookImportName = (name: string) =>
  name === "FormattedDate" ? "Date as FormattedDate" : name;

const REACT_HOOK_IMPORTS = [
  "useCallback",
  "useEffect",
  "useMemo",
  "useRef",
  "useState",
];

const buildReactImport = (source: string) => {
  const hooks = REACT_HOOK_IMPORTS.filter((hook) =>
    new RegExp(`\\b${hook}\\b`).test(source)
  );

  return hooks.length > 0
    ? `import React, { ${hooks.join(", ")} } from "react";`
    : `import React from "react";`;
};

const buildPlaybookImport = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  source: string
) => {
  const localNames = collectLocalDeclarationNames(source);
  const names = new Set<string>();

  collectImportNames(instances, kitsByName).forEach((name) => names.add(name));
  collectActivePlaybookImports(instances, kitsByName).forEach((name) => names.add(name));
  collectComponentNamesFromCode(source).forEach((name) => names.add(name));

  const importNames = Array.from(names)
    .filter((name) => !localNames.has(name))
    .map(formatPlaybookImportName)
    .sort();

  return `import { ${importNames.length ? importNames.join(", ") : "Card"} } from "playbook-ui";`;
};

export const generateCode = (
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) => {
  const context: CodeRenderContext = {
    setupSnippets: [],
    usedSetupNames: new Set(),
  };
  const renderedInstances = instances.length === 0
    ? "    {/* Add kits to start composing. */}"
    : instances
        .map((instance) => renderInstanceCode(instance, kitsByName, 2, globalProps, context))
        .join("\n");
  const setupCode = context.setupSnippets.join("\n\n");
  const componentCode = `export const PlaygroundComposition = () => (
  <div className="playground-composition">
${renderedInstances}
  </div>
);`;
  const source = [setupCode, componentCode].filter(Boolean).join("\n\n");
  const externalImports = Array.from(collectExternalImportStatements(instances, kitsByName));
  const imports = [
    buildReactImport(source),
    ...externalImports,
    buildPlaybookImport(instances, kitsByName, source),
  ].filter(Boolean);

  return `${imports.join("\n")}

${source}`;
};
