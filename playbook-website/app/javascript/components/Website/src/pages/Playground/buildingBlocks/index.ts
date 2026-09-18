import { BUILDING_BLOCK_PLANS } from "./plans";
import type { PromptBuilderPlanItem } from "../promptCompiler";

export type BuildingBlock = {
  id: string;
  name: string;
  description: string;
  buildPlan: () => PromptBuilderPlanItem[];
};

export const PLAYGROUND_BUILDING_BLOCKS: BuildingBlock[] = [
  {
    id: "custom_user_display",
    name: "Custom User Display",
    description:
      "A compact user identity pattern combining Avatar, Title, Badge, and Body.",
    buildPlan: BUILDING_BLOCK_PLANS.custom_user_display,
  },
  // {
  //   id: "global_positioning",
  //   name: "Global Positioning",
  //   description:
  //     "Examples of absolute positioning with Badge, Avatar, Image, Nav, and IconCircle.",
  //   buildPlan: BUILDING_BLOCK_PLANS.global_positioning,
  // },

  {
    id: "notification_banner",
    name: "Notification Banner",
    description:
      "Status banners for success, error, warning, neutral, and info messaging.",
    buildPlan: BUILDING_BLOCK_PLANS.notification_banner,
  },
  {
    id: "table_filter_card",
    name: "Table Filter Card",
    description:
      "A filtered data table pattern with Filter, form kits, and Table together.",
    buildPlan: BUILDING_BLOCK_PLANS.table_filter_card,
  },
];

export const getBuildingBlockById = (id: string | null) =>
  PLAYGROUND_BUILDING_BLOCKS.find((block) => block.id === id) ?? null;
