# frozen_string_literal: true

module Playbook
  module PbNav
    class Item < Playbook::KitBase
      prop :active, type: Playbook::Props::Boolean, default: false
      prop :link
      prop :text
      prop :icon_left
      prop :icon_right
      prop :image_url
      prop :target, type: Playbook::Props::Enum,
                    values: %w[_blank _self _parent _top],
                    default: "_self"
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
          href: link,
          target: target
        )
      end

    private

      def active_class
        active ? "active" : nil
      end
    end
  end
end
