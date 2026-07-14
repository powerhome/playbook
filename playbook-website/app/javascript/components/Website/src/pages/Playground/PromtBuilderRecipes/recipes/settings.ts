import type { PromptBuilderPlanItem } from "../../promptCompiler";
import {
  createBodyText,
  createButton,
  createCard,
  createFlex,
  createKit,
  createTextInput,
  createTitle,
  getScreenTitleFromPrompt,
} from "../utils";

export const buildSettingsPlan = (prompt: string): PromptBuilderPlanItem[] => [
  createTitle(getScreenTitleFromPrompt(prompt)),
  createBodyText("Manage account details, preferences, and notification settings."),
  createCard([
    createTitle("Account", 4),
    createTextInput("Name"),
    createTextInput("Email"),
    createTextInput("Role"),
  ]),
  createCard([
    createTitle("Preferences", 4),
    createFlex([
      createBodyText("Email notifications"),
      createKit("toggle", { checked: true, name: "email_notifications" }),
    ], "row"),
    createFlex([
      createBodyText("Product updates"),
      createKit("toggle", { checked: false, name: "product_updates" }),
    ], "row"),
  ]),
  createFlex([
    createButton("Save Changes"),
    createButton("Cancel", "secondary"),
  ], "row"),
];
