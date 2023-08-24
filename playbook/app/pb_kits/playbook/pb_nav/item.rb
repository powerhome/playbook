# frozen_string_literal: true

module Playbook
  module PbNav
    class Item < Playbook::KitBase
      prop :active, type: Playbook::Props::Boolean, default: false
      prop :font_size, type: Playbook::Props::Enum,
                       values: %w[normal small],
                       default: "normal"
      prop :font_weight, type: Playbook::Props::Enum,
                         values: %w[bold regular bolder],
                         default: "regular"
      prop :collapsible, type: Playbook::Props::Boolean, default: false
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
          "#{generate_classname('pb_collapsible_nav_item', active_class, collapsible_trail_class)} #{font_size_class} #{font_weight_class} pb_nav_list_item_link_collapsible"
        else
          "#{generate_classname('pb_nav_list_kit_item', active_class)} #{font_size_class} #{font_weight_class} pb_nav_list_item_link"
        end
      end

      def tag
        link ? "a" : "div"
      end

      def collapsible_icons
        icon_right.present? && icon_right
      end

    private

      def active_class
        active ? "active" : nil
      end

      def font_weight_class
        case font_weight
        when "bold"
          "font_bold"
        when "bolder"
          "font_bolder"
        else
          "font_regular"
        end
      end

      def collapsible_trail_class
        collapsible_trail ? "collapsible_trail" : nil
      end

      def font_size_class
        font_size === "small" ? "font_size_small" : "font_size_normal"
      end
    end
  end
end
