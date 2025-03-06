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
      prop :input_name, type: Playbook::Props::String,
                        default: ""
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[multi single],
                     default: "multi"
      prop :pill_color, type: Playbook::Props::Enum,
                        values: %w[primary neutral success warning error info data_1 data_2 data_3 data_4 data_5 data_6 data_7 data_8 windows siding roofing doors gutters solar insulation accessories],
                        default: "primary"
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false

      def classname
        generate_classname("pb_multi_level_select")
      end

      def multi_level_select_options
        {
          disabled: disabled,
          id: id,
          inputDisplay: input_display,
          name: name,
          treeData: tree_data,
          returnAllSelected: return_all_selected,
          selectedIds: selected_ids,
          input_name: input_name,
          variant: variant,
          pillColor: pill_color,
        }
      end
    end
  end
end
