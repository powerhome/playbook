# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox < Playbook::KitBase
      prop :error, type: Playbook::Props::Boolean, default: false
      prop :checked, type: Playbook::Props::Boolean, default: false
      prop :indeterminate_main, type: Playbook::Props::Boolean, default: false
      prop :indeterminate_parent
      prop :text
      prop :value
      prop :name
      prop :disabled, type: Playbook::Props::Boolean, default: false

      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :form_spacing, type: Playbook::Props::Boolean,
                          default: false
      prop :hidden_input, type: Playbook::Props::Boolean,
                          default: false
      prop :hidden_value

      def classname
        generate_classname("pb_checkbox_kit", checked_class) + error_class
      end

      def input
        inputs = []
        effective_name = name || input_options[:name]
        effective_value = value || input_options[:value] || "1"
        is_checked = checked || input_options[:checked]

        inputs << hidden_field_tag(effective_name, hidden_value || "0") if hidden_input && effective_name.present?

        inputs << check_box_tag(
          effective_name,
          effective_value,
          is_checked,
          input_options.merge(disabled: disabled)
        )

        safe_join(inputs)
      end

      def checkbox_label_status
        error ? "negative" : nil
      end

      def data
        Hash(prop(:data)).merge(
          pb_checkbox_indeterminate_main: indeterminate_main,
          pb_checkbox_indeterminate_parent: indeterminate_parent
        )
      end

    private

      def error_class
        error ? " error" : ""
      end

      def checked_class
        checked ? "on" : "off"
      end
    end
  end
end
