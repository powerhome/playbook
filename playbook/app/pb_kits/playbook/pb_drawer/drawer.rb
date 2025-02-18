# frozen_string_literal: true

module Playbook
  module PbDrawer
    class Drawer < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl full],
                  default: "md"
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[left right],
                       default: "left"
      prop :should_close_on_overlay_click, type: Playbook::Props::Boolean, default: true
      prop :behavior, type: Playbook::Props::Enum,
                      values: %w[floating push],
                      default: "floating"

      def classname
        generate_classname("pb_drawer pb_drawer_#{size}_#{placement}")
      end

      def overlay_close
        !should_close_on_overlay_click ? "overlay_close" : ""
      end

      def overlay_classes
        "pb_drawer_overlay drawer_content_#{placement} pb_drawer_overlay_after_open"
      end
    end
  end
end
