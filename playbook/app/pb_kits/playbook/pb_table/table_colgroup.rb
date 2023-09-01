# frozen_string_literal: true

module Playbook
  module PbTable
    class TableColgroup < Playbook::KitBase
      prop :span, type: Playbook::Props::Number,
                  default: 1

      def classname
        generate_classname("pb_table_colgroup_kit")
      end
    end
  end
end
