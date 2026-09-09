# frozen_string_literal: true

module Playbook
  module PbPill
    class Pill < Playbook::KitBase
      prop :text
      prop :size, type: Playbook::Props::Enum,
                  values: ["sm", nil],
                  default: nil
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
                     default: "neutral"
      prop :notification, type: Playbook::Props::Boolean,
                          default: false
      prop :text_transform, type: Playbook::Props::Enum,
                            values: %w[none lowercase],
                            default: "lowercase"

      def classname
        generate_classname("pb_pill_kit", color_variant, text_transform, notification_class, size)
      end

      def display_text
        object.text
      end

    private

      def color_variant
        notification && variant != "error" ? "primary" : variant
      end

      def notification_class
        notification ? "notification" : nil
      end
    end
  end
end
