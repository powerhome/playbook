import type { PromptBuilderPlanItem } from "../promptCompiler";

export const RECIPE_SPACING = {
  cardContent: "sm",
  inline: "sm",
  screenSection: "md",
  stack: "md",
} as const;

export const normalizePrompt = (prompt: string) =>
  prompt
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Single-word terms match on word boundaries so "form" doesn't fire inside
// "performance" or "platform"; multi-word phrases stay a plain substring
// check since they're already specific enough to rarely false-positive.
export const promptHasTerm = (prompt: string, term: string) => {
  const normalizedTerm = normalizePrompt(term);
  if (!normalizedTerm) return false;

  if (!normalizedTerm.includes(" ")) {
    return new RegExp(`(^|\\s)${escapeRegExp(normalizedTerm)}(?=\\s|$)`).test(
      prompt,
    );
  }

  return prompt.includes(normalizedTerm);
};

export const promptIncludesAny = (prompt: string, terms: string[]) =>
  terms.some((term) => promptHasTerm(prompt, term));

export const createKit = (
  kitName: string,
  props: Record<string, unknown> = {},
  children: PromptBuilderPlanItem[] = [],
  configuredChildren: string | null = null
): PromptBuilderPlanItem => ({
  kitName,
  structureMode: null,
  dataPresetKey: null,
  props,
  configuredChildren,
  children,
});

export const withGlobalProps = (
  item: PromptBuilderPlanItem,
  props: Record<string, unknown>
): PromptBuilderPlanItem => ({
  ...item,
  props: {
    ...(item.props ?? {}),
    ...props,
  },
});

export const withBottomSpacing = (
  items: PromptBuilderPlanItem[],
  marginBottom = RECIPE_SPACING.screenSection
) =>
  items.map((item, index) =>
    index === items.length - 1 ? item : withGlobalProps(item, { marginBottom })
  );

export const createScreen = (items: PromptBuilderPlanItem[]) =>
  withBottomSpacing(items, RECIPE_SPACING.screenSection);

export const createTitle = (text: string, size = 2) =>
  createKit("title", { text, size });
export const createBodyText = (text: string) =>
  createKit("body", { color: "light", text });
export const createCard = (children: PromptBuilderPlanItem[]) =>
  createKit(
    "card",
    { background: "white", padding: "md" },
    withBottomSpacing(children, RECIPE_SPACING.cardContent)
  );
export const createFlex = (
  children: PromptBuilderPlanItem[],
  orientation = "column"
) =>
  createKit(
    "flex",
    {
      gap: orientation === "row" ? RECIPE_SPACING.inline : RECIPE_SPACING.stack,
      orientation,
    },
    children
  );
export const createButton = (text: string, variant = "primary") =>
  createKit("button", { text, variant });
export const createTextInput = (label: string) =>
  createKit("text_input", {
    label,
    name: label.toLowerCase().replace(/\s+/g, "_"),
    placeholder: label,
  });

export const getFieldLabelsFromPrompt = (prompt: string) => {
  if (promptIncludesAny(prompt, ["billing", "payment", "invoice"])) {
    return ["Billing Contact", "Email", "Company", "Invoice Notes"];
  }

  if (promptIncludesAny(prompt, ["profile", "user", "account"])) {
    return ["Name", "Email", "Role", "Phone"];
  }

  if (promptIncludesAny(prompt, ["project", "task", "ticket"])) {
    return ["Name", "Owner", "Status", "Due Date"];
  }

  return ["Name", "Email", "Description"];
};

export const getScreenTitleFromPrompt = (prompt: string) => {
  const quoted = prompt.match(/"([^"]+)"/)?.[1];
  if (quoted) return quoted;
  if (promptHasTerm(prompt, "settings")) return "Settings";
  if (promptHasTerm(prompt, "dashboard")) return "Dashboard";
  if (promptHasTerm(prompt, "billing")) return "Billing";
  if (promptHasTerm(prompt, "profile")) return "Profile";
  if (promptHasTerm(prompt, "table")) return "Records";
  if (promptHasTerm(prompt, "form")) return "New Record";
  return "Generated Screen";
};
