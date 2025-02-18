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
      prop :behavior, type: Playbook::Props::Enum,
                      values: %w[floating push],
                      default: "floating"
      prop :overlay, type: Playbook::Props::Boolean,
                     default: true
      prop :border, type: Playbook::Props::Enum,
                    values: %w[full none right left],
                    default: "none"

      def classname
        generate_classname("pb_drawer pb_drawer_#{size}_#{placement} #{border_classes}")
      end

      def border_classes
        case border
        when "full"
          "drawer_border-full"
        when "right"
          "drawer_border-right"
        when "left"
          "drawer_border-left"
        else
          ""
        end
      end

      def overlay_close
        !should_close_on_overlay_click ? "overlay_close" : ""
      end

      def overlay_classes
        "pb_drawer_#{overlay ? '' : 'no_'}overlay drawer_content_#{placement} pb_drawer_overlay_after_open #{overlay ? '' : 'no-background'}"
      end
    end
  end
end
