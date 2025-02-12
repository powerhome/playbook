# frozen_string_literal: true

module Playbook
  module PbTable
    class TableBody < Playbook::KitBase
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[table div],
                 default: "table"
      prop :draggable_container, type: Playbook::Props::Boolean,
                                 default: false

      def classname
        generate_classname("pb_table_tbody")
      end
    end
  end
end
