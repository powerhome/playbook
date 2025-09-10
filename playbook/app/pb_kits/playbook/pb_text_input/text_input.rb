# frozen_string_literal: true

# rubocop:disable Style/SingleArgumentDig
module Playbook
  module PbTextInput
    class TextInput < Playbook::KitBase
      VALID_MASKS = %w[currency zip_code postal_code ssn credit_card cvv].freeze

      MASK_PATTERNS = {
        "currency" => '^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$',
        "zip_code" => '\d{5}',
        "postal_code" => '\d{5}-\d{4}',
        "ssn" => '\d{3}-\d{2}-\d{4}',
        "credit_card" => '\d{4} \d{4} \d{4} \d{4}',
        "cvv" => '\d{3,4}',
      }.freeze

      prop :autocomplete, default: true
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

      prop :mask, type: Playbook::Props::Enum,
                  values: ["currency", "zip_code", "postal_code", "ssn", "credit_card", "cvv", nil],
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

      def sanitized_id
        "#{object.id}-sanitized" if id.present?
      end

    private

      def all_input_options
        {
          autocomplete: autocomplete == true ? nil : (autocomplete.presence || "off"),
          class: "text_input #{input_options.dig(:classname) || ''}",
          data: validation_data,
          disabled: disabled,
          id: input_options.dig(:id) || id,
          name: mask.present? ? "" : name,
          pattern: validation_pattern || mask_pattern,
          placeholder: placeholder,
          style: "cursor: #{cursor_style}",
          required: required,
          type: type,
          value: value,
          mask: mask,
        }.merge(input_options)
      end

      def cursor_style
        # If input is disabled, always use 'not-allowed'
        return "not-allowed" if disabled

        # If cursor prop is provided, convert it to kebab-case
        if cursor.present?
          # Convert camelCase (ex. notAllowed) to kebab-case (ex. not-allowed)
          cursor.to_s.gsub(/([a-z\d])([A-Z])/, '\1-\2').downcase
        else
          # Default to 'pointer'
          "pointer"
        end
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
        mask ? fields.merge(pb_input_mask: true) : fields
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
    end
  end
end
# rubocop:enable Style/SingleArgumentDig
