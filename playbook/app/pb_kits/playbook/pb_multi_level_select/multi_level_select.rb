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
      prop :wrapped, type: Playbook::Props::Boolean,
                     default: false
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :error, type: Playbook::Props::String,
                   default: ""
      prop :label, type: Playbook::Props::String,
                   default: ""
      prop :placeholder, type: Playbook::Props::String,
                         default: "Start typing..."
      prop :required_indicator, type: Playbook::Props::Boolean,
                                default: false
      prop :show_checked_children, type: Playbook::Props::Boolean,
                                   default: true

      def classname
        generate_classname("pb_multi_level_select") + error_class
      end

      def data
        Hash(prop(:data)).merge(
          pb_multi_level_select: true,
          tree_data: tree_data.to_json,
          selected_ids: selected_ids.to_json,
          return_all_selected: bool_attr(return_all_selected),
          input_display: input_display,
          input_name: input_name,
          variant: variant,
          pill_color: pill_color,
          wrapped: bool_attr(wrapped),
          disabled: bool_attr(disabled),
          required: bool_attr(required),
          name: name,
          placeholder: placeholder,
          show_checked_children: bool_attr(show_checked_children)
        )
      end

      def input_id
        return "#{id}_input" if id.present?
        return sanitize_for_id(name) if name.present?
        return sanitize_for_id(label) if label.present?

        "multiselect_input"
      end

      def error_id
        error.present? ? "#{input_id}-error" : nil
      end

      def arrow_down_id
        "arrow_down_#{id.presence || input_id}"
      end

      def arrow_up_id
        "arrow_up_#{id.presence || input_id}"
      end

      def error_class
        error.present? ? " error" : ""
      end

    private

      def bool_attr(value)
        value ? "true" : "false"
      end

      def sanitize_for_id(str)
        str.to_s.downcase.gsub(/\s+/, "_").gsub(/[^a-z0-9_]/, "")
      end
    end
  end
end
