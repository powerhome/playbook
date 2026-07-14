import type { PromptBuilderPlanItem } from "../../promptCompiler";
import { createKit, getScreenTitleFromPrompt } from "../utils";

export const buildEmptyStatePlan = (prompt: string): PromptBuilderPlanItem[] => [
  createKit("empty_state", {
    alignment: "center",
    description: "Create a record or adjust your filters to see results here.",
    header: getScreenTitleFromPrompt(prompt),
    primaryButton: "Create New",
    size: "md",
  }),
];
