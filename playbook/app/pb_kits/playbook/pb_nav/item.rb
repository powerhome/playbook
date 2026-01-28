# frozen_string_literal: true

module Playbook
  module PbNav
    class Item < Playbook::KitBase
      prop :active, type: Playbook::Props::Boolean, default: false
      prop :disabled, type: Playbook::Props::Boolean, default: false
      prop :font_size, type: Playbook::Props::Enum,
                       values: %w[normal small],
                       default: "normal"
      prop :font_weight, type: Playbook::Props::Enum,
                         values: %w[bold regular bolder],
                         default: "regular"
      prop :highlighted_border, type: Playbook::Props::Boolean, default: true
      prop :collapsible, type: Playbook::Props::Boolean, default: false
      prop :collapsed, type: Playbook::Props::Boolean, default: true
      prop :link
      prop :text
      prop :collapsible_trail, type: Playbook::Props::Boolean, default: false
      prop :icon_left
      prop :icon_right
      prop :image_url
      prop :inactive, type: Playbook::Props::Boolean, default: false
      prop :target, type: Playbook::Props::Enum,
                    values: %w[_blank _self _parent _top],
                    default: "_self"
      def classname
        if collapsible
          "#{generate_classname('pb_nav_list_kit_item', active_class, highlighted_border_class)} #{generate_classname('pb_collapsible_nav_item', active_class, collapsible_trail_class)} #{font_size_class} #{font_weight_class} pb_nav_list_item_link_collapsible"
        else
          "#{generate_classname('pb_nav_list_kit_item', active_class, highlighted_border_class)} #{font_size_class} #{font_weight_class} pb_nav_list_item_link#{disabled_class} #{inactive_class}"
        end
      end

      def spacing_props
        if collapsible
          if object.margin || object.margin_x || object.margin_y || object.margin_bottom || object.margin_top || object.margin_right || object.margin_left
            # Call the original method
            original_result = super

            # Remove p_value, px_value, py_value, etc. based on the object's properties
            margin_classes_to_remove = []
            margin_classes_to_remove << "m_#{object.margin}" if object.margin
            margin_classes_to_remove << "mx_#{object.margin_x}" if object.margin_x
            margin_classes_to_remove << "my_#{object.margin_y}" if object.margin_y
            margin_classes_to_remove << "mb_#{object.margin_bottom}" if object.margin_bottom
            margin_classes_to_remove << "mt_#{object.margin_top}" if object.margin_top
            margin_classes_to_remove << "mr_#{object.margin_right}" if object.margin_right
            margin_classes_to_remove << "ml_#{object.margin_left}" if object.margin_left

            margin_classes_to_remove.each do |class_to_remove|
              original_result.gsub!(class_to_remove, "")
            end

            original_result.strip
          else
            super
          end
        else
          super
        end
      end

      def margin_classes
        margin_attributes = {
          margin: "m",
          margin_x: "mx",
          margin_y: "my",
          margin_bottom: "mb",
          margin_top: "mt",
          margin_right: "mr",
          margin_left: "ml",
        }

        # rubocop:disable Style/RedundantAssignment
        margin_classes = margin_attributes.map do |attr, class_prefix|
          # rubocop:enable Style/RedundantAssignment
          value = object.public_send(attr)
          " #{class_prefix}_#{value}" if value
        end.compact.join

        margin_classes
      end

      def tag
        link && !disabled ? "a" : "div"
      end

      def is_link
        link && !disabled
      end

      def collapsible_icons
        icon_right.present? && icon_right
      end

      def collapsible_nav_classname
        generate_classname("collapsible_nav_wrapper", active_class, collapsible_trail_class, inactive_class)
      end

    private

      def active_class
        active ? "active" : nil
      end

      def disabled_class
        disabled ? " pb_nav_item_disabled" : nil
      end

      def inactive_class
        inactive ? " pb_nav_item_inactive" : nil
      end

      def highlighted_border_class
        !highlighted_border && active ? "highlighted_border_none" : nil
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
