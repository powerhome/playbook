# frozen_string_literal: true

module Playbook
  module PbNav
    class Nav < Playbook::KitBase
      prop :link, default: "#"
      prop :title
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "vertical"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[normal subtle bold],
                     default: "normal"
      prop :highlight, type: Playbook::Props::Boolean, default: true
      prop :borderless, type: Playbook::Props::Boolean, default: false
      prop :tabbing, type: Playbook::Props::Boolean, default: false
      prop :extended_underline, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_nav_list", variant, orientation, highlight_class, borderless_class) + extended_underline_class
      end

      def data
        if tabbing
          Hash(prop(:data)).merge(pb_nav_tab: true)
        else
          prop(:data)
        end
      end

      def highlight_class
        highlight ? "highlight" : nil
      end

      def borderless_class
        borderless ? "borderless" : nil
      end

      def extended_underline_class
        variant === "normal" && orientation === "horizontal" && extended_underline ? " pb_nav_extended_underline" : ""
      end
    end
  end
end
