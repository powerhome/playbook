# frozen_string_literal: true

module Playbook
  module Grid
    def self.included(base)
      base.prop :grid_template_columns
      base.prop :grid_template_rows
      base.prop :grid_template_areas
      base.prop :grid_column
      base.prop :grid_row
      base.prop :grid_area
      base.prop :grid_auto_columns
      base.prop :grid_auto_rows
    end

    def grid_options
      {
        grid_template_columns: "grid-template-columns",
        grid_template_rows: "grid-template-rows",
        grid_template_areas: "grid-template-areas",
        grid_column: "grid-column",
        grid_row: "grid-row",
        grid_area: "grid-area",
        grid_auto_columns: "grid-auto-columns",
        grid_auto_rows: "grid-auto-rows",
      }
    end
  end
end
