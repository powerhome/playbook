# frozen_string_literal: true

module Playbook
  module PbCard
    class Card < Playbook::KitBase
      prop :selected, type: Playbook::Props::Boolean, default: false
      prop :shadow, type: Playbook::Props::Enum,
                    values: %w[none deep deeper deepest],
                    default: "none"
      prop :highlight, type: Playbook::Props::Hash,
                       default: {}
      prop :html_tag, type: Playbook::Props::String,
                      default: "div"
      prop :border_none, type: Playbook::Props::Boolean,
                         default: false
      prop :border_radius, type: Playbook::Props::Enum,
                           values: %w[xs sm md lg xl none rounded],
                           default: "md"

      def classname
        generate_classname("pb_card_kit",
                           selected_class,
                           shadow_class,
                           highlight_position_class,
                           highlight_color_class,
                           border_class,
                           border_radius_class)
      end

      def body_padding
        if padding.present?
          ""
        else
          "p_md"
        end
      end

    private

      def selected_class
        selected ? "selected" : "deselected"
      end

      def shadow_class
        shadow != "none" ? "shadow_#{shadow}" : nil
      end

      def highlight_position_class
        highlight[:position].present? ? "highlight_#{highlight[:position]}" : nil
      end

      def highlight_color_class
        highlight[:color].present? ? "highlight_#{highlight[:color]}" : nil
      end

      def border_class
        border_none == true ? "border_none" : nil
      end

      def border_radius_class
        border_radius != "md" ? "border_radius_#{border_radius}" : nil
      end
    end
  end
end
