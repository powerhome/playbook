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
      
      def classname
        generate_classname("pb_circle_icon_button_kit", variant, dark_class)
      end

      def dark_class
        dark ? "dark" : nil
      end
      
      def icon
        if is_set? configured_icon
          pb_icon = Playbook::PbIcon::Icon.new(icon: configured_icon, fixed_width: true, size: "md")
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        end
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
