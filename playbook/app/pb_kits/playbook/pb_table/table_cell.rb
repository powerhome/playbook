# frozen_string_literal: true

module Playbook
  module PbTable
    class TableCell < Playbook::KitBase
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[table div],
                 default: "table"
      prop :text, type: Playbook::Props::String,
                  default: ""
      prop :colspan, type: Playbook::Props::Number,
                     default: 1

      def classname
        generate_classname("pb_table_td")
      end
    end
  end
end
