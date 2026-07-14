import type { PromptBuilderPlanItem } from "../../promptCompiler";
import {
  createBodyText,
  createButton,
  createCard,
  createFlex,
  createKit,
  createTextInput,
  createTitle,
  getFieldLabelsFromPrompt,
  getScreenTitleFromPrompt,
} from "../utils";

export const buildFormPlan = (prompt: string): PromptBuilderPlanItem[] => [
  createTitle(getScreenTitleFromPrompt(prompt)),
  createBodyText("Capture the core details and submit when ready."),
  createCard([
    ...getFieldLabelsFromPrompt(prompt).map(createTextInput),
    createKit("select", {
      label: "Status",
      name: "status",
      options: [
        { text: "Active", value: "active" },
        { text: "Draft", value: "draft" },
        { text: "Archived", value: "archived" },
      ],
    }),
    createKit("textarea", {
      label: "Notes",
      name: "notes",
      placeholder: "Add notes",
    }),
  ]),
  createFlex([createButton("Submit"), createButton("Cancel", "secondary")], "row"),
];
