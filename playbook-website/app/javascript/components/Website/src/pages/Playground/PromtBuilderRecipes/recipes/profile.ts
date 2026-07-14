import type { PromptBuilderPlanItem } from "../../promptCompiler";
import { createCard, createKit, createTitle, getScreenTitleFromPrompt } from "../utils";

export const buildProfilePlan = (prompt: string): PromptBuilderPlanItem[] => [
  createTitle(getScreenTitleFromPrompt(prompt)),
  createCard([
    createKit("user", { name: "Jordan Lee", title: "Product Manager" }),
    createKit("contact", {
      contactType: "email",
      contactValue: "jordan@example.com",
    }),
    createKit("contact", { contactType: "cell", contactValue: "555-123-4567" }),
  ]),
  createCard([
    createTitle("Details", 4),
    createKit("label_value", { label: "Team", value: "Product" }),
    createKit("label_value", { label: "Status", value: "Active" }),
  ]),
];
