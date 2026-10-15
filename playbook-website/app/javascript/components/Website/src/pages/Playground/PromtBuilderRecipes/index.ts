import { buildDirectKitRecipeItems } from "./aliases";
import { buildDashboardPlan } from "./recipes/dashboard";
import { buildEmptyStatePlan } from "./recipes/emptyState";
import { buildFormPlan } from "./recipes/form";
import { buildProfilePlan } from "./recipes/profile";
import { buildSettingsPlan } from "./recipes/settings";
import { buildTablePlan } from "./recipes/table";
import type { KitMap, PromptRecipeResult } from "./types";
import { normalizePrompt, promptIncludesAny } from "./utils";
import type { PromptBuilderPlanItem } from "../promptCompiler";

export const buildPromptPlanFromRecipes = (
  rawPrompt: string,
  kitsByName: KitMap
): PromptRecipeResult => {
  const prompt = normalizePrompt(rawPrompt);
  const diagnostics: string[] = [];
  let instances: PromptBuilderPlanItem[] = [];

  if (promptIncludesAny(prompt, ["settings", "preferences", "configure"])) {
    instances = buildSettingsPlan(prompt);
  } else if (
    promptIncludesAny(prompt, ["dashboard", "metrics", "stats", "analytics"])
  ) {
    instances = buildDashboardPlan(prompt);
  } else if (
    promptIncludesAny(prompt, ["empty state", "blank state", "no results"])
  ) {
    instances = buildEmptyStatePlan(prompt);
  } else if (
    promptIncludesAny(prompt, ["profile", "user detail", "contact card"])
  ) {
    instances = buildProfilePlan(prompt);
  } else if (promptIncludesAny(prompt, ["table", "records", "data grid"])) {
    instances = buildTablePlan(prompt);
  } else if (promptIncludesAny(prompt, ["form", "fields", "input", "crud"])) {
    instances = buildFormPlan(prompt);
  } else {
    instances = buildDirectKitRecipeItems(prompt, kitsByName);
  }

  if (instances.length === 0) {
    diagnostics.push(
      "No recipe matched. Try words like settings, dashboard, form, table, empty state, profile, card, button, or input."
    );
  }

  return {
    diagnostics,
    plan: {
      mode: "replace",
      summary: "Built with local Playbook recipes.",
      instances,
    },
  };
};
