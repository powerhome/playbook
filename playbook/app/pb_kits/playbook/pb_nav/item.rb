# frozen_string_literal: true

module Playbook
  module PbNav
    class Item < Playbook::KitBase
      prop :active, type: Playbook::Props::Boolean, default: false
      prop :bold, type: Playbook::Props::Boolean, default: false
      prop :collapsible, type: Playbook::Props::Boolean, default: false
      prop :emphasized, type: Playbook::Props::Boolean, default: false
      prop :link
      prop :text
      prop :collapsible_trail, type: Playbook::Props::Boolean, default: false
      prop :icon_left
      prop :icon_right
      prop :image_url
      prop :target, type: Playbook::Props::Enum,
                    values: %w[_blank _self _parent _top],
                    default: "_self"
      def classname
        if collapsible
          "pb_collapsible_nav_item #{generate_classname('pb_nav_list_kit_item', active_class, bold_class, collapsible_trail_class, emphasized_class)}"
        else
          generate_classname("pb_nav_list_kit_item", active_class)
        end
      end

      def tag
        link ? "a" : "div"
      end

      def options
        {
          class: collapsible ? "pb_nav_list_item_link_collapsible" : "pb_nav_list_item_link",
        }.compact
      end

      def link_options
        options.merge(
          href: link,
          target: target
        )
      end

      def collapsible_icons
        icon_right.present? ? icon_right : %w[plus minus]
      end

    private

      def active_class
        active ? "active" : nil
      end

      def bold_class
        bold ? "bold" : nil
      end

      def collapsible_trail_class
        collapsible_trail ? "collapsible_trail" : nil
      end

      def emphasized_class
        emphasized ? "emphasized" : nil
      end
    end
  end
end
