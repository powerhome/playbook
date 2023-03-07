# frozen_string_literal: true

module Playbook
  module PbMultiLevelSelect
    class MultiLevelSelect < Playbook::KitBase
      prop :tree_data, type: Playbook::Props::Array,
                       default: []

      def classname
        generate_classname("pb_multi_level_select")
      end

      def multi_level_select_options
        {
          id: id,
          treeData: tree_data,
        }
      end
    end
  end
end
