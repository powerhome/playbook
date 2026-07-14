import type { PromptBuilderPlanItem } from "../promptCompiler";

export const normalizePrompt = (prompt: string) =>
  prompt
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const promptIncludesAny = (prompt: string, terms: string[]) =>
  terms.some((term) => prompt.includes(term));

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

export const createTitle = (text: string, size = 2) =>
  createKit("title", { text, size });
export const createBodyText = (text: string) =>
  createKit("body", { color: "light", text });
export const createCard = (children: PromptBuilderPlanItem[]) =>
  createKit("card", { background: "white", padding: "md" }, children);
export const createFlex = (
  children: PromptBuilderPlanItem[],
  orientation = "column"
) => createKit("flex", { gap: "md", orientation }, children);
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
  if (prompt.includes("settings")) return "Settings";
  if (prompt.includes("dashboard")) return "Dashboard";
  if (prompt.includes("billing")) return "Billing";
  if (prompt.includes("profile")) return "Profile";
  if (prompt.includes("table")) return "Records";
  if (prompt.includes("form")) return "New Record";
  return "Generated Screen";
};
