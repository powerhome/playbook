# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableHeader < Playbook::KitBase
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"

      def classname
        generate_classname("pb_advanced_table_header", "pb_table_thead", separator: " ")
      end

      def th_classname
        generate_classname("table-header-cells", separator: " ")
      end
    end
  end
end
