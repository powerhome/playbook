# frozen_string_literal: true

module Playbook
  module PbCollapsible
    class CollapsibleMain < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default light lighter link success error],
                   default: "default"
      prop :size, type: Playbook::Props::Enum,
                  values: ["lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", nil],
                  default: nil
      def data
        Hash(prop(:data)).merge(collapsible_main: true)
      end

      def classname
        generate_classname("pb_collapsible_main_kit", padding, separator: " ")
      end

      def icon_size
        return "" if size.nil?

        size_object = { lg: "fa-lg", xs: "fa-xs", sm: "fa-sm", "1x": "fa-1x", "2x": "fa-2x", "3x": "fa-3x", "4x": "fa-4x", "5x": "fa-5x", "6x": "fa-6x", "7x": "fa-7x", "8x": "fa-8x", "9x": "fa-9x", "10x": "fa-10x" }
        size_object[size.to_sym]
      end

      def icon_color
        return "" if color.nil?

        color_object = { light: "#687887", lighter: "#C1CDD6", link: "#0056CF", success: "#00CA74", error: "#FF2229", default: "#242B42" }
        color_object[color.to_sym]
      end
    end
  end
end
