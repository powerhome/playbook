# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleIcon < Playbook::KitBase
      prop :collapsed, type: Playbook::Props::Boolean,
                       default: true
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default light lighter link success error],
                   default: "default"
      prop :icon
      prop :size, type: Playbook::Props::Enum,
                  values: ["lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", nil],
                  default: nil

      def classname
        generate_classname("pb_collapsible_icon_kit", separator: " ")
      end

      def show_icon(icon)
        case icon
        when ::String
          [icon, icon]
        when ::Array
          icon
        end
      end

      def icon_color
        return "" if color.nil?

        color_object = { light: "#687887", lighter: "#C1CDD6", link: "#0056CF", success: "#00CA74", error: "#FF2229", default: "#242B42" }
        color_object[color.to_sym]
      end
    end
  end
end
