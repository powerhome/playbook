import cellBehavior from "./cell_behavior.svg";
import columnConfiguration from "./column_configuration.svg";
import defaultPreview from "./default.svg";
import layoutAndPositioning from "./layout_&_positioning.svg";
import paginationAndDataStates from "./pagination_&_data_states.svg";
import rowInteraction from "./row_interaction.svg";
import sorting from "./sorting.svg";
import styling from "./styling.svg";

export const advancedTablePreviewMap = {
  "advanced_table/cell_behavior": cellBehavior,
  "advanced_table/column_configuration": columnConfiguration,
  "advanced_table/default": defaultPreview,
  "advanced_table/layout_&_positioning": layoutAndPositioning,
  "advanced_table/pagination_&_data_states": paginationAndDataStates,
  "advanced_table/row_interaction": rowInteraction,
  "advanced_table/sorting": sorting,
  "advanced_table/styling": styling,
} as const;
