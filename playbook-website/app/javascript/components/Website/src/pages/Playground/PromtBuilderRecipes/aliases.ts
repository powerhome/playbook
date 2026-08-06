import type { PromptBuilderPlanItem } from "../promptCompiler";
import type { KitMap } from "./types";
import {
  createButton,
  createKit,
  createTextInput,
  promptIncludesAny,
} from "./utils";

const KIT_ALIASES: Record<string, string[]> = {
  advanced_table: ["advanced table", "data grid", "grid"],
  badge: ["badge", "status badge"],
  button: ["button", "cta", "action"],
  card: ["card", "panel", "section"],
  checkbox: ["checkbox", "check box"],
  date_picker: ["date picker", "date field"],
  dropdown: ["dropdown", "menu"],
  filter: ["filter", "filters", "search filter"],
  list: ["list"],
  message: ["message", "alert", "notice"],
  select: ["select", "picklist"],
  table: ["table"],
  text_input: ["text input", "input", "field"],
  textarea: ["textarea", "text area", "notes"],
  toggle: ["toggle", "switch"],
};

export const buildDirectKitRecipeItems = (prompt: string, kitsByName: KitMap) =>
  Object.entries(KIT_ALIASES).reduce<PromptBuilderPlanItem[]>(
    (items, [kitName, aliases]) => {
      if (!kitsByName[kitName] || !promptIncludesAny(prompt, aliases)) {
        return items;
      }

      if (kitName === "button") {
        items.push(createButton("Primary Action"));
      } else if (kitName === "text_input") {
        items.push(createTextInput("Name"));
      } else {
        items.push(createKit(kitName));
      }

      return items;
    },
    []
  );
