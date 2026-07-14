import type { PromptBuilderPlanItem } from "../../promptCompiler";
import {
  createBodyText,
  createKit,
  createTitle,
  getScreenTitleFromPrompt,
  promptIncludesAny,
} from "../utils";

const createTableWithFilterCard = (tableKitName: "advanced_table" | "table") =>
  createKit("card", { background: "white", padding: "none" }, [
    createKit("filter", { background: false, results: 24 }),
    createKit("section_separator"),
    tableKitName === "advanced_table"
      ? createKit("advanced_table", { tableProps: { container: false } })
      : createKit("table", { container: false }),
  ]);

export const buildTablePlan = (prompt: string): PromptBuilderPlanItem[] => [
  createTitle(getScreenTitleFromPrompt(prompt)),
  createBodyText("Search, filter, and review records."),
  createTableWithFilterCard(
    promptIncludesAny(prompt, ["advanced"]) ? "advanced_table" : "table"
  ),
];
