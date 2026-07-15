import type { PromptBuilderPlan, PromptBuilderPlanItem } from "../promptCompiler";
import type { PlaygroundKit } from "../types";

export type PromptRecipeResult = {
  diagnostics: string[];
  plan: PromptBuilderPlan;
};

export type KitMap = Record<string, PlaygroundKit>;

export type PromptRecipeBuilder = (prompt: string) => PromptBuilderPlanItem[];
