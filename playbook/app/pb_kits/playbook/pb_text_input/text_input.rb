# frozen_string_literal: true

# rubocop:disable Style/SingleArgumentDig
module Playbook
  module PbTextInput
    class TextInput < Playbook::KitBase
      VALID_MASKS = %w[currency zipCode postalCode ssn].freeze

      MASK_PATTERNS = {
        "currency" => '^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$',
        "zipCode" => '\d{5}',
        "postalCode" => '\d{5}-\d{4}',
        "ssn" => '\d{3}-\d{2}-\d{4}',
      }.freeze

      MASK_PLACEHOLDERS = {
        "currency" => "$0.00",
        "zipCode" => "12345",
        "postalCode" => "12345-6789",
        "ssn" => "123-45-6789",
      }.freeze

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
      prop :mask, type: Playbook::Props::String,
                  default: nil

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
          data: validation_data.merge(mask_data),
          disabled: disabled,
          id: input_options.dig(:id) || id,
          name: name,
          pattern: validation_pattern || mask_pattern,
          placeholder: placeholder || mask_placeholder,
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

      def mask_data
        return {} unless mask
        raise ArgumentError, "mask must be one of: #{VALID_MASKS.join(', ')}" unless VALID_MASKS.include?(mask)

        { mask: mask }
      end

      def mask_pattern
        return nil unless mask

        MASK_PATTERNS[mask]
      end

      def mask_placeholder
        return nil unless mask

        MASK_PLACEHOLDERS[mask]
      end
    end
  end
end
# rubocop:enable Style/SingleArgumentDig
