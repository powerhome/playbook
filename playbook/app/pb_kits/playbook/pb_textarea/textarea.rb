# frozen_string_literal: true

module Playbook
  module PbTextarea
    class Textarea < Playbook::KitBase
      prop :emoji_mask, type: Playbook::Props::Boolean,
                        default: false
      prop :error
      prop :inline, type: Playbook::Props::Boolean,
                    default: false
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
