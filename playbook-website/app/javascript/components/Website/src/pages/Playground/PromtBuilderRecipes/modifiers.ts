import {
  acceptsChildren,
  createInstance,
  displayPropType,
  getAllPropDefinitionsWithGlobals,
} from "../kitUtils";
import type { BuilderInstance, PlaygroundKit, PropDefinition } from "../types";
import {
  escapeRegExp,
  normalizePrompt,
  promptHasTerm,
  promptIncludesAny,
} from "./utils";

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
  { kitName: "textarea", aliases: ["textarea", "text area", "notes"] },
  { kitName: "table", aliases: ["table"] },
  { kitName: "filter", aliases: ["filter"] },
  { kitName: "card", aliases: ["card", "car", "panel"] },
  // Kept in sync with aliases.ts's KIT_ALIASES so a kit recognized when
  // adding to an empty canvas is also recognized when swapping it in place.
  { kitName: "badge", aliases: ["badge", "status badge"] },
  { kitName: "button", aliases: ["button", "cta"] },
  { kitName: "checkbox", aliases: ["checkbox", "check box"] },
  { kitName: "date_picker", aliases: ["date picker", "date field"] },
  { kitName: "dropdown", aliases: ["dropdown"] },
  { kitName: "list", aliases: ["list"] },
  { kitName: "message", aliases: ["message", "alert", "notice"] },
  { kitName: "select", aliases: ["select", "picklist"] },
  { kitName: "toggle", aliases: ["toggle", "switch"] },
];

const PROP_ALIASES: Record<string, string[]> = {
  background: ["background"],
  container: ["container"],
  gap: ["gap", "spacing", "space between"],
  margin: ["margin"],
  marginBottom: ["margin bottom", "bottom margin", "margin below"],
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
// "for" covers idiomatic phrasing like "change X input for Y input" or
// "swap the bar chart for a line chart", not just "replace X with Y".
const REPLACE_SEPARATORS = [" with ", " to ", " for "];

// Kits identified as a single labeled "field" — a rename request between two
// of these (e.g. "change email input for phone input") should relabel the
// matching instance in place rather than swap it for a blank default one.
const FIELD_KIT_NAMES = new Set(["text_input", "textarea"]);
const FIELD_ALIAS_WORDS = ["text input", "text area", "input", "field", "textarea"];

const normalizeKitKey = (kitName: string) =>
  kitName
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/^_+/, "")
    .replace(/^(pb_)+/, "");

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
    return aliases.some((alias) => promptHasTerm(text, alias));
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
    aliases.some((alias) => promptHasTerm(prompt, alias))
  )?.[0];
  if (!propName) return null;

  const value = VALUE_ALIASES.find(({ aliases }) =>
    aliases.some((alias) => promptHasTerm(prompt, alias))
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

const toTitleCase = (text: string) =>
  text.replace(/\b\w/g, (character) => character.toUpperCase());

// Strips leading replace verbs/articles and the trailing field-alias word
// itself, leaving just the label: "change x input" -> "x", "y field" -> "y".
const extractFieldLabel = (text: string): string | null => {
  let cleaned = text.trim();

  REPLACE_WORDS.forEach((word) => {
    cleaned = cleaned.replace(new RegExp(`^${escapeRegExp(word)}\\s+`), "");
  });
  cleaned = cleaned.replace(/^(the|this|that|a|an)\s+/, "");

  const aliasPattern = new RegExp(
    `\\s*(${FIELD_ALIAS_WORDS.map(escapeRegExp).join("|")})\\s*$`
  );
  cleaned = cleaned.replace(aliasPattern, "").trim();

  return cleaned.length > 0 ? cleaned : null;
};

const findFieldInstanceByLabel = (
  instances: BuilderInstance[],
  label: string
): BuilderInstance | null => {
  for (const instance of instances) {
    const currentLabel = normalizePrompt(String(instance.props.label ?? ""));
    if (FIELD_KIT_NAMES.has(instance.kitName) && currentLabel === label) {
      return instance;
    }

    const match = findFieldInstanceByLabel(instance.children, label);
    if (match) return match;
  }

  return null;
};

const renameFieldInstance = (
  instances: BuilderInstance[],
  targetId: string,
  destinationLabel: string
): BuilderInstance[] =>
  instances.map((instance) => {
    if (instance.id === targetId) {
      return {
        ...instance,
        props: {
          ...instance.props,
          label: destinationLabel,
          name: destinationLabel.toLowerCase().replace(/\s+/g, "_"),
          placeholder: destinationLabel,
        },
        enabledProps: {
          ...instance.enabledProps,
          label: true,
          name: true,
          placeholder: true,
        },
      };
    }

    return {
      ...instance,
      children: renameFieldInstance(instance.children, targetId, destinationLabel),
    };
  });

const applyFieldRenamePrompt = (
  prompt: string,
  instances: BuilderInstance[]
): PromptModificationResult | null => {
  if (!promptIncludesAny(prompt, REPLACE_WORDS)) return null;

  const destinationText = getTextAfterAny(prompt, REPLACE_SEPARATORS);
  const sourceText = getTextBeforeAny(prompt, REPLACE_SEPARATORS);
  if (!destinationText || sourceText === prompt) return null;

  // Only take over when both sides name a "field" — a true kit-type swap
  // (e.g. "swap the table for a data grid") falls through to
  // applyReplacementPrompt instead.
  const sourceIsField = FIELD_ALIAS_WORDS.some((alias) =>
    promptHasTerm(sourceText, alias)
  );
  const destinationIsField = FIELD_ALIAS_WORDS.some((alias) =>
    promptHasTerm(destinationText, alias)
  );
  if (!sourceIsField || !destinationIsField) return null;

  const sourceLabel = extractFieldLabel(sourceText);
  const destinationLabel = extractFieldLabel(destinationText);
  if (!sourceLabel || !destinationLabel) return null;

  const targetInstance = findFieldInstanceByLabel(instances, sourceLabel);
  if (!targetInstance) {
    return {
      diagnostics: [`Could not find a field labeled "${sourceLabel}" to rename.`],
      handled: true,
      instances,
    };
  }

  const destinationLabelText = toTitleCase(destinationLabel);

  return {
    diagnostics: [],
    handled: true,
    instances: renameFieldInstance(instances, targetInstance.id, destinationLabelText),
    summary: `Renamed "${toTitleCase(sourceLabel)}" field to "${destinationLabelText}".`,
  };
};

const applyReplacementPrompt = (
  prompt: string,
  instances: BuilderInstance[],
  kitsByName: Record<string, PlaygroundKit>,
  globalProps?: Record<string, PropDefinition>
): PromptModificationResult | null => {
  if (!promptIncludesAny(prompt, REPLACE_WORDS)) return null;

  const destinationText = getTextAfterAny(prompt, REPLACE_SEPARATORS);
  const sourceText = getTextBeforeAny(prompt, REPLACE_SEPARATORS);
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
    applyFieldRenamePrompt(prompt, instances) ??
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
