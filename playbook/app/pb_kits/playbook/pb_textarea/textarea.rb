# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea < Playbook::KitBase
      prop :emoji_mask, type: Playbook::Props::Boolean,
                        default: false
      prop :error
      prop :inline, type: Playbook::Props::Boolean,
                    default: false
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :label
      prop :method
      prop :name
      prop :placeholder
      prop :resize, type: Playbook::Props::Enum,
                    values: %w[none both horizontal vertical auto],
                    default: "none"
      prop :rows, type: Playbook::Props::Number,
                  default: 4
      prop :value
      prop :character_count
      prop :onkeyup
      prop :max_characters
      prop :required_indicator, type: Playbook::Props::Boolean,
                                default: false

      def classname
        generate_classname("pb_textarea_kit") + error_class + resize_class + inline_class
      end

      def character_counter
        max_characters && character_count ? "#{character_count} / #{max_characters}" : character_count
      end

      def textarea_options
        {
          data: emoji_mask ? { pb_emoji_mask: true } : {},
        }
      end

      def all_textarea_attributes
        # Merge data attributes: emoji_mask data + input_options data
        data_attrs = textarea_options[:data] || {}
        input_data = input_options[:data] || {}
        merged_data = data_attrs.merge(input_data)

        base_attributes = {
          'aria-describedby': error.present? ? error_id : nil,
          'aria-invalid': error.present?,
          id: input_options[:id] || id || "object_method",
          max_characters: max_characters,
          name: name,
          onkeyup: onkeyup,
          placeholder: placeholder,
          rows: rows,
          value: value,
        }

        # Merge input_options (excluding data to handle separately)
        input_options_without_data = input_options.except(:data)
        result = base_attributes.merge(input_options_without_data)

        # Add merged data if present (input_options data takes precedence over emoji_mask data)
        result[:data] = merged_data unless merged_data.empty?

        result
      end

      def error_id
        "#{id}-error" if error.present?
      end

    private

      def error_class
        error ? " error" : ""
      end

      def inline_class
        inline ? " inline" : ""
      end

      def resize_class
        " resize_#{resize}"
      end
    end
  end
end
