# frozen_string_literal: true

module Playbook
  module PbTable
    class TableColgroup < Playbook::KitBase
      def classname
        generate_classname("pb_table_colgroup_kit")
      end
    end
  end
end
