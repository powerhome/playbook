import {
  acceptsChildren,
  createInstance,
  displayPropType,
  getAllPropDefinitionsWithGlobals,
} from "../kitUtils";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "../types";
import { normalizePrompt, promptIncludesAny } from "./utils";

type PromptModificationResult = {
  diagnostics: string[];
  handled: boolean;
  instances: BuilderInstance[];
  summary?: string;
};

type KitAlias = {
  aliases: string[];
  kitName: string;
};

type PropEdit = {
  propName: string;
  value: unknown;
};

const GRAPH_KIT_NAMES = new Set([
  "pb_bar_graph",
  "pb_circle_chart",
  "pb_gauge_chart",
  "pb_line_graph",
]);

const KIT_ALIASES: KitAlias[] = [
  { kitName: "advanced_table", aliases: ["advanced table", "data grid"] },
  { kitName: "pb_circle_chart", aliases: ["circle", "circle chart", "circle chat", "pie chart", "donut chart"] },
  { kitName: "pb_bar_graph", aliases: ["bar", "bar graph", "bar chart"] },
  { kitName: "pb_line_graph", aliases: ["line graph", "line chart"] },
  { kitName: "pb_gauge_chart", aliases: ["gauge chart"] },
  { kitName: "section_separator", aliases: ["section separator", "separator"] },
  { kitName: "text_input", aliases: ["text input", "input", "field"] },
  { kitName: "table", aliases: ["table"] },
  { kitName: "filter", aliases: ["filter"] },
  { kitName: "card", aliases: ["card", "car", "panel"] },
];

const PROP_ALIASES: Record<string, string[]> = {
  background: ["background"],
  container: ["container"],
  padding: ["padding", "pad"],
};

const VALUE_ALIASES: Array<{ aliases: string[]; value: unknown }> = [
  { aliases: ["false", "off", "no"], value: false },
  { aliases: ["true", "on", "yes"], value: true },
  { aliases: ["none", "no padding", "no background"], value: "none" },
  { aliases: ["xxs"], value: "xxs" },
  { aliases: ["xs"], value: "xs" },
  { aliases: ["sm", "small"], value: "sm" },
  { aliases: ["md", "medium"], value: "md" },
  { aliases: ["lg", "large"], value: "lg" },
  { aliases: ["xl"], value: "xl" },
  { aliases: ["white"], value: "white" },
  { aliases: ["light"], value: "light" },
  { aliases: ["dark"], value: "dark" },
];

const REPLACE_WORDS = ["replace", "swap", "change"];
const PROP_EDIT_WORDS = ["set", "make", "making", "update", "change"];

const normalizeKitKey = (kitName: string) =>
  kitName
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/^_+/, "")
    .replace(/^(pb_)+/, "");

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const promptHasAlias = (text: string, alias: string) => {
  const normalizedAlias = normalizePrompt(alias);
  if (!normalizedAlias) return false;

  if (normalizedAlias.length <= 3 && !normalizedAlias.includes(" ")) {
    return new RegExp(`(^|\\s)${escapeRegExp(normalizedAlias)}(?=\\s|$)`).test(text);
  }

  return text.includes(normalizedAlias);
};

const kitNamesMatch = (candidate: string, target: string) => {
  if (candidate === target) return true;

  const normalizedCandidate = normalizeKitKey(candidate);
  const normalizedTarget = normalizeKitKey(target);
  return (
    normalizedCandidate === normalizedTarget ||
    normalizedCandidate.endsWith(normalizedTarget) ||
    normalizedTarget.endsWith(normalizedCandidate)
  );
};

const instanceMatchesKitName = (
  instance: BuilderInstance,
  kitName: string,
  kitsByName: Record<string, PlaygroundKit>
) => {
  if (kitNamesMatch(instance.kitName, kitName)) return true;

  const schemaName = kitsByName[instance.kitName]?.kit_schema?.name ?? "";
  return schemaName ? kitNamesMatch(schemaName, kitName) : false;
};

const findKitAliasInText = (text: string, allowedKits?: Set<string>) =>
  KIT_ALIASES.find(({ aliases, kitName }) => {
    if (allowedKits && !allowedKits.has(kitName)) return false;
    return aliases.some((alias) => promptHasAlias(text, alias));
  })?.kitName ?? null;

const getTextAfterAny = (prompt: string, separators: string[]) => {
  const indexes = separators
    .map((separator) => prompt.indexOf(separator))
    .filter((index) => index >= 0);
  if (indexes.length === 0) return "";

  const index = Math.min(...indexes);
  const separator = separators.find((item) => prompt.indexOf(item) === index) ?? "";
  return prompt.slice(index + separator.length);
};

const getTextBeforeAny = (prompt: string, separators: string[]) => {
  const indexes = separators
    .map((separator) => prompt.indexOf(separator))
    .filter((index) => index >= 0);
  if (indexes.length === 0) return prompt;

  return prompt.slice(0, Math.min(...indexes));
};

const instanceContainsKit = (
  instance: BuilderInstance,
  kitNames: Set<string>,
  kitsByName: Record<string, PlaygroundKit>
): boolean =>
  instance.children.some(
    (child) =>
      Array.from(kitNames).some((kitName) =>
        instanceMatchesKitName(child, kitName, kitsByName)
      ) || instanceContainsKit(child, kitNames, kitsByName)
  );

const replaceFirstMatchingKit = (
  instances: BuilderInstance[],
  sourceKitName: string,
  destinationKit: PlaygroundKit,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
): { changed: boolean; instances: BuilderInstance[] } => {
  let changed = false;

  const replaceInTree = (items: BuilderInstance[]): BuilderInstance[] =>
    items.map((instance) => {
      if (!changed && instanceMatchesKitName(instance, sourceKitName, kitsByName)) {
        changed = true;
        const replacement = createInstance(destinationKit, globalProps);
        const shouldKeepChildren = acceptsChildren(destinationKit);

        return {
          ...replacement,
          id: instance.id,
          children: shouldKeepChildren ? instance.children : [],
        };
      }

      return {
        ...instance,
        children: replaceInTree(instance.children),
      };
    });

  const nextInstances = replaceInTree(instances);

  return { changed, instances: nextInstances };
};

const replaceFirstGraphKit = (
  instances: BuilderInstance[],
  destinationKit: PlaygroundKit,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
) => {
  let changed = false;

  const replaceInTree = (items: BuilderInstance[]): BuilderInstance[] =>
    items.map((instance) => {
      const isGraph = Array.from(GRAPH_KIT_NAMES).some((kitName) =>
        instanceMatchesKitName(instance, kitName, kitsByName)
      );

      if (!changed && isGraph) {
        changed = true;
        const replacement = createInstance(destinationKit, globalProps);
        const shouldKeepChildren = acceptsChildren(destinationKit);

        return {
          ...replacement,
          id: instance.id,
          children: shouldKeepChildren ? instance.children : [],
        };
      }

      return {
        ...instance,
        children: replaceInTree(instance.children),
      };
    });

  const nextInstances = replaceInTree(instances);

  return { changed, instances: nextInstances };
};

const coercePropValue = (
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
    if (typeof value === "string") return { ok: true, value: value === "true" };
    return { ok: false };
  }

  if (value === null || ["boolean", "number", "string"].includes(typeof value)) {
    return { ok: true, value };
  }

  return { ok: false };
};

const parsePropEdit = (prompt: string): PropEdit | null => {
  const propName = Object.entries(PROP_ALIASES).find(([, aliases]) =>
    aliases.some((alias) => promptHasAlias(prompt, alias))
  )?.[0];
  if (!propName) return null;

  const value = VALUE_ALIASES.find(({ aliases }) =>
    aliases.some((alias) => promptHasAlias(prompt, alias))
  )?.value;
  if (value === undefined) return null;

  return { propName, value };
};

const getPropTargetKitName = (prompt: string) => {
  const targetText = getTextBeforeAny(prompt, [" with ", " containing "]);
  return findKitAliasInText(targetText) ?? findKitAliasInText(prompt);
};

const getDescendantConditionKitNames = (prompt: string) => {
  const conditionText = getTextAfterAny(prompt, [" with ", " containing "]);
  const kitName = conditionText ? findKitAliasInText(conditionText) : null;
  if (!kitName) return null;

  const relatedNames = new Set([kitName]);
  if (kitName === "table") relatedNames.add("advanced_table");
  return relatedNames;
};

const updateFirstMatchingProp = (
  instances: BuilderInstance[],
  targetKitName: string,
  propEdit: PropEdit,
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>,
  descendantKitNames?: Set<string> | null
): { changed: boolean; diagnostics: string[]; instances: BuilderInstance[] } => {
  let changed = false;
  const diagnostics: string[] = [];

  const updateTree = (items: BuilderInstance[]): BuilderInstance[] =>
    items.map((instance) => {
      const children = updateTree(instance.children);
      const matchesTarget =
        !changed &&
        instanceMatchesKitName(instance, targetKitName, kitsByName) &&
        (!descendantKitNames ||
          instanceContainsKit(instance, descendantKitNames, kitsByName));

      if (!matchesTarget) return { ...instance, children };

      const kit = kitsByName[instance.kitName];
      const propDefinitions = getAllPropDefinitionsWithGlobals(kit, globalProps);
      const definition = propDefinitions[propEdit.propName];
      if (!definition) {
        diagnostics.push(`Ignored unknown prop "${propEdit.propName}" on ${kit?.label ?? instance.kitName}.`);
        return { ...instance, children };
      }

      const coerced = coercePropValue(propEdit.value, definition);
      if (!coerced.ok) {
        diagnostics.push(`Ignored invalid value for "${propEdit.propName}" on ${kit?.label ?? instance.kitName}.`);
        return { ...instance, children };
      }

      changed = true;
      return {
        ...instance,
        children,
        enabledProps: {
          ...instance.enabledProps,
          [propEdit.propName]: true,
        },
        props: {
          ...instance.props,
          [propEdit.propName]: coerced.value,
        },
      };
    });

  const nextInstances = updateTree(instances);

  return { changed, diagnostics, instances: nextInstances };
};

const applyReplacementPrompt = (
  prompt: string,
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
): PromptModificationResult | null => {
  if (!promptIncludesAny(prompt, REPLACE_WORDS)) return null;

  const destinationText = getTextAfterAny(prompt, [" with ", " to "]);
  const sourceText = getTextBeforeAny(prompt, [" with ", " to "]);
  const destinationKitName = findKitAliasInText(
    destinationText,
    new Set(Object.keys(kitsByName))
  );
  const sourceKitName = findKitAliasInText(sourceText, new Set(Object.keys(kitsByName)));

  if (!destinationKitName || !sourceKitName) return null;

  const destinationKit = kitsByName[destinationKitName];
  const result = replaceFirstMatchingKit(
    instances,
    sourceKitName,
    destinationKit,
    kitsByName,
    globalProps
  );
  const fallbackResult =
    result.changed || !GRAPH_KIT_NAMES.has(sourceKitName)
      ? result
      : replaceFirstGraphKit(instances, destinationKit, kitsByName, globalProps);

  if (!fallbackResult.changed) {
    return {
      diagnostics: [`Could not find a ${sourceKitName.replace(/_/g, " ")} to replace.`],
      handled: true,
      instances,
    };
  }

  return {
    diagnostics: [],
    handled: true,
    instances: fallbackResult.instances,
    summary: `Replaced ${sourceKitName.replace(/_/g, " ")} with ${destinationKit.label}.`,
  };
};

const applyPropEditPrompt = (
  prompt: string,
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
): PromptModificationResult | null => {
  if (!promptIncludesAny(prompt, PROP_EDIT_WORDS)) return null;

  const propEdit = parsePropEdit(prompt);
  const targetKitName = getPropTargetKitName(prompt);
  if (!propEdit || !targetKitName || !kitsByName[targetKitName]) return null;

  const descendantKitNames = getDescendantConditionKitNames(prompt);
  const result = updateFirstMatchingProp(
    instances,
    targetKitName,
    propEdit,
    kitsByName,
    globalProps,
    descendantKitNames
  );

  if (!result.changed) {
    return {
      diagnostics: result.diagnostics.length
        ? result.diagnostics
        : [`Could not find a matching ${targetKitName.replace(/_/g, " ")} to update.`],
      handled: true,
      instances,
    };
  }

  return {
    diagnostics: result.diagnostics,
    handled: true,
    instances: result.instances,
    summary: `Updated ${targetKitName.replace(/_/g, " ")} ${propEdit.propName}.`,
  };
};

export const applyPromptModification = (
  rawPrompt: string,
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
): PromptModificationResult => {
  const prompt = normalizePrompt(rawPrompt);
  const modification =
    applyReplacementPrompt(prompt, instances, kitsByName, globalProps) ??
    applyPropEditPrompt(prompt, instances, kitsByName, globalProps);

  return (
    modification ?? {
      diagnostics: [],
      handled: false,
      instances,
    }
  );
};
