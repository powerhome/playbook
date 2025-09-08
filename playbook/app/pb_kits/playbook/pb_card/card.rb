# frozen_string_literal: true

module Playbook
  module PbCard
    class Card < Playbook::KitBase
      prop :selected, type: Playbook::Props::Boolean, default: false
      prop :highlight, type: Playbook::Props::HashProp,
                       default: {}
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[div section footer header article aside main nav],
                 default: "div"
      prop :border_none, type: Playbook::Props::Boolean,
                         default: false
      prop :border_radius, type: Playbook::Props::Enum,
                           values: %w[xs sm md lg xl none rounded],
                           default: "md"
      prop :background, type: Playbook::Props::Enum,
                        values: %w[white light dark product_1_background product_1_highlight product_2_background product_2_highlight product_3_background product_3_highlight product_4_background product_4_highlight product_5_background product_5_highlight product_6_background product_6_highlight product_7_background product_7_highlight product_8_background product_8_highlight product_9_background product_9_highlight product_10_background product_10_highlight windows siding doors solar roofing gutters insulation none success_subtle warning_subtle error_subtle info_subtle neutral_subtle],
                        default: "none"
      prop :drag_id, type: Playbook::Props::String
      prop :draggable_item, type: Playbook::Props::Boolean,
                            default: false
      prop :drag_handle, type: Playbook::Props::Boolean,
                         default: true
      prop :items, type: Playbook::Props::Array,
                   default: []
      prop :drop_zone_line_color, type: Playbook::Props::Enum,
                                  values: ["primary", "purple", nil],
                                  default: nil

      def classname
        classes = ["pb_card_kit"]
        classes << "pb_card_kit_selected" if selected
        classes << "pb_card_kit_border_none" if border_none
        classes << "pb_card_kit_border_radius_#{border_radius}" if border_radius != "md"
        classes << "pb_card_kit_background_#{background}" if background != "none"
        classes << "pb_card_kit_highlight_#{highlight[:position]}" if highlight[:position].present?
        classes << "pb_card_kit_highlight_#{highlight[:color]}" if highlight[:color].present?
        generate_classname(classes.compact.join(" "))
      end

    private

      def selected_class
        selected ? "selected" : "deselected"
      end

      def highlight_position_class
        highlight[:position].present? ? "highlight_#{highlight[:position]}" : nil
      end

      def highlight_color_class
        highlight[:color].present? ? "highlight_#{highlight[:color]}" : nil
      end

      def background_class
        background == "none" ? nil : "background_#{background}"
      end

      def border_class
        border_none == true ? "border_none" : nil
      end

      def border_radius_class
        border_radius != "md" ? "border_radius_#{border_radius}" : nil
      end

      def line_color_class
        case drop_zone_line_color
        when "primary"
          "drop_zone_color_primary"
        when "purple"
          "drop_zone_color_purple"
        end
      end
    end
  end
end
