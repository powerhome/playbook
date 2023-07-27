# frozen_string_literal: true

module Playbook
  module PbMultiLevelSelect
    class MultiLevelSelect < Playbook::KitBase
      prop :id
      prop :name
      prop :tree_data, type: Playbook::Props::Array,
                       default: []
      prop :return_all_selected, type: Playbook::Props::Boolean,
                                 default: false
      prop :selected_ids, type: Playbook::Props::Array,
                          default: []
      prop :input_display, type: Playbook::Props::Enum,
                           values: %w[pills none],
                           default: "pills"

      def classname
        generate_classname("pb_multi_level_select")
      end

      def multi_level_select_options
        {
          id: id,
          inputDisplay: input_display,
          name: name,
          treeData: tree_data,
          returnAllSelected: return_all_selected,
          selectedIds: selected_ids,
        }
      end
    end
  end
end
