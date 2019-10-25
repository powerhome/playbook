# frozen_string_literal: true

module Playbook
  module PbCircleIconButton
    class CircleIconButton
      include Playbook::Props

      partial "pb_circle_icon_button/circle_icon_button"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :icon
      prop :link, default: "https://www.google.com"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[primary secondary link],
                     default: "primary"
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      
      def classname
        generate_classname("pb_circle_icon_button_kit", variant, dark_class)
      end

      def dark_class
        dark ? "dark" : nil
      end

      def disabled_class
        disabled ? "disabled" : nil
      end

      def kit_class
        kit_options = [
          "pb_circle_icon_button_kit",
          variant,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_circle_icon_button/circle_icon_button"
      end

    private

    end

  end
end
