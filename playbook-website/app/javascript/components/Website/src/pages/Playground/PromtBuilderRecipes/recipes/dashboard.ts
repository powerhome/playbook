import type { PromptBuilderPlanItem } from "../../promptCompiler";
import {
  createBodyText,
  createCard,
  createFlex,
  createKit,
  createTitle,
  getScreenTitleFromPrompt,
  promptIncludesAny,
} from "../utils";

export const buildDashboardPlan = (prompt: string): PromptBuilderPlanItem[] => [
  createTitle(getScreenTitleFromPrompt(prompt)),
  createBodyText("Track key activity, trends, and recent records."),
  createFlex([
    createCard([createBodyText("Open Items"), createKit("stat_value", { value: 128 })]),
    createCard([createBodyText("Closed"), createKit("stat_value", { value: 42 })]),
    createCard([
      createBodyText("Conversion"),
      createKit("stat_value", { unit: "%", value: 74 }),
    ]),
  ], "row"),
  createCard([
    createTitle("Activity", 4),
    promptIncludesAny(prompt, ["line", "trend"])
      ? createKit("pb_line_graph")
      : createKit("pb_bar_graph"),
  ]),
  createCard([
    createTitle("Recent Records", 4),
    createKit("filter"),
    createKit("advanced_table"),
  ]),
];
