# frozen_string_literal: true

module Playbook
  module PbNav
    class Item
      include Playbook::Props

      partial "pb_nav/item"

      prop :active, type: Playbook::Props::Boolean, default: false
      prop :link
      prop :text
      prop :icon_left
      prop :icon_right

      def classname
        generate_classname("pb_nav_list_kit_item", active_class)
      end

      def tag
        link ? "a" : "div"
      end

      def options
        {
          class: "pb_nav_list_item_link",
        }.compact
      end

      def link_options
        options.merge(
          href: link
        )
      end

    private

      def active_class
        active ? "active" : nil
      end
    end
  end
end
