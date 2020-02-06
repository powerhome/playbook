# frozen_string_literal: true

module Playbook
  module PbNav
    class Nav
      include ActionView::Helpers::TagHelper
      include Playbook::Props

      partial "pb_nav/nav"

      prop :link, default: "#"
      prop :title
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "vertical"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[normal subtle],
                     default: "normal"
      prop :highlight, type: Playbook::Props::Boolean, default: true

      def classname
        generate_classname("pb_nav_list", variant, orientation, highlight_class)
      end

      def highlight_class
        highlight ? "highlight" : nil
      end
    end
  end
end
