# frozen_string_literal: true

module Playbook
  module PbCard
    class Card < Playbook::KitBase
      prop :selected, type: Playbook::Props::Boolean, default: false
      prop :highlight, type: Playbook::Props::Hash,
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
                        values: %w[white light dark windows siding doors solar roofing gutters insulation none],
                        default: "none"

      def classname
        generate_classname("pb_card_kit",
                           selected_class,
                           border_class,
                           border_radius_class,
                           background_class,
                           highlight_position_class,
                           highlight_color_class)
      end

      def body_padding
        if padding.present?
          ""
        else
          "p_md"
        end
      end

      def body_flex_direction
        if flex_direction.present?
          "flex_direction_#{flex_direction}"
        else
          ""
        end
      end

      def body_flex_wrap
        if flex_wrap.present?
          "flex_wrap_#{flex_wrap}"
        else
          ""
        end
      end

      def body_justify_content
        if justify_content.present?
          "justify_content_#{justify_content}"
        else
          ""
        end
      end

      def body_justify_self
        if justify_self.present?
          "justify_self_#{justify_self}"
        else
          ""
        end
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
    end
  end
end
