# frozen_string_literal: true

module Playbook
  module PbNav
    class Item < Playbook::KitBase
      prop :active, type: Playbook::Props::Boolean, default: false
      prop :font_size, type: Playbook::Props::Enum,
                       values: %w[regular small],
                       default: "regular"
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
          "#{generate_classname('pb_nav_list_kit_item', active_class)} #{generate_classname('pb_collapsible_nav_item', active_class, collapsible_trail_class)} #{font_size_class} #{font_weight_class}"
        else
          "#{generate_classname('pb_nav_list_kit_item', active_class)} #{font_size_class} #{font_weight_class}"
        end
      end

      def spacing_props
        if object.padding || object.padding_x || object.padding_y || object.padding_bottom || object.padding_top || object.padding_right || object.padding_left || object.margin || object.margin_x || object.margin_y || object.margin_bottom || object.margin_top || object.margin_right || object.margin_left
          # Call the original method
          original_result = super

          # Remove p_value, px_value, py_value, etc. based on the object's properties
          padding_classes_to_remove = []
          padding_classes_to_remove << "p_#{object.padding}" if object.padding
          padding_classes_to_remove << "px_#{object.padding_x}" if object.padding_x
          padding_classes_to_remove << "py_#{object.padding_y}" if object.padding_y
          padding_classes_to_remove << "pb_#{object.padding_bottom}" if object.padding_bottom
          padding_classes_to_remove << "pt_#{object.padding_top}" if object.padding_top
          padding_classes_to_remove << "pr_#{object.padding_right}" if object.padding_right
          padding_classes_to_remove << "pl_#{object.padding_left}" if object.padding_left
          padding_classes_to_remove << "m_#{object.margin}" if object.margin
          padding_classes_to_remove << "mx_#{object.margin_x}" if object.margin_x
          padding_classes_to_remove << "my_#{object.margin_y}" if object.margin_y
          padding_classes_to_remove << "mb_#{object.margin_bottom}" if object.margin_bottom
          padding_classes_to_remove << "mt_#{object.margin_top}" if object.margin_top
          padding_classes_to_remove << "mr_#{object.margin_right}" if object.margin_right
          padding_classes_to_remove << "ml_#{object.margin_left}" if object.margin_left

          padding_classes_to_remove.each do |class_to_remove|
            original_result.gsub!(class_to_remove, "")
          end

          original_result.strip
        else
          super
        end
      end

      def tag
        link ? "a" : "div"
      end

      def options
        {
          class: collapsible ? "pb_nav_list_item_link_collapsible #{padding_classes}" : "pb_nav_list_item_link #{padding_classes}",
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
        font_size === "small" ? "font_size_small" : "font_size_regular"
      end

      def padding_classes
        spacing_attributes = {
          padding: "p",
          padding_x: "px",
          padding_y: "py",
          padding_bottom: "pb",
          padding_top: "pt",
          padding_right: "pr",
          padding_left: "pl",
          margin: "m",
          margin_x: "mx",
          margin_y: "my",
          margin_bottom: "mb",
          margin_top: "mt",
          margin_right: "mr",
          margin_left: "ml",
        }

        # rubocop:disable Style/RedundantAssignment
        padding_classes = spacing_attributes.map do |attr, class_prefix|
          # rubocop:enable Style/RedundantAssignment
          value = object.public_send(attr)
          " #{class_prefix}_#{value}" if value
        end.compact.join

        padding_classes
      end
    end
  end
end
