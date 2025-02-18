# frozen_string_literal: true

module Playbook
  module PbDrawer
    class Drawer < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl full],
                  default: "md"
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[left right center],
                       default: "left"
      prop :should_close_on_overlay_click, type: Playbook::Props::Boolean, default: true

      def classname
        generate_classname("pb_drawer pb_drawer_#{size}_#{placement}")
      end

      def full_height_style
        if full_height && size === "xl"
          "full_height_center"
        elsif full_height && size != "xl"
          "full_height_#{placement}"
        end
      end

      def overlay_close
        !should_close_on_overlay_click ? "overlay_close" : ""
      end
    end
  end
end
