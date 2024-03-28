# frozen_string_literal: true

# rubocop:disable Style/SingleArgumentDig
module Playbook
  module PbTextInput
    class TextInput < Playbook::KitBase
      prop :autocomplete, type: Playbook::Props::Boolean,
                          default: true
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :error
      prop :inline, type: Playbook::Props::Boolean,
                    default: false
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :label
      prop :name
      prop :placeholder
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :type, default: "text"
      prop :validation, type: Playbook::Props::HashProp,
                        default: {}
      prop :value
      prop :add_on, type: Playbook::Props::NestedProps,
                    nested_kit: Playbook::PbTextInput::AddOn

      def classname
        default_margin_bottom = margin_bottom.present? ? "" : " mb_sm"
        generate_classname("pb_text_input_kit") + default_margin_bottom + error_class + inline_class
      end

      def input_tag
        tag(:input, all_input_options)
      end

      def has_add_on?
        add_on.present?
      end

      def add_on_class
        has_add_on? ? "text_input_wrapper_add_on" : nil
      end

      def add_on_props
        { dark: dark }.merge(add_on || {})
      end

    private

      def all_input_options
        {
          autocomplete: autocomplete ? nil : "off",
          class: "text_input #{input_options.dig(:classname) || ''}",
          data: validation_data,
          disabled: disabled,
          id: input_options.dig(:id) || id,
          name: name,
          pattern: validation_pattern,
          placeholder: placeholder,
          required: required,
          type: type,
          value: value,
        }.merge(input_options)
      end

      def validation_message
        validation[:message] || ""
      end

      def validation_pattern
        validation[:pattern] || nil
      end

      def validation_data
        fields = input_options.dig(:data) || {}
        fields[:message] = validation_message unless validation_message.blank?
        fields
      end

      def error_class
        error ? " error" : ""
      end

      def inline_class
        inline ? " inline" : ""
      end
    end
  end
end
# rubocop:enable Style/SingleArgumentDig
