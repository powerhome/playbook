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
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[div section footer header article aside main nav],
                 default: "div"
      prop :border_none, type: Playbook::Props::Boolean,
                         default: false
      prop :border_radius, type: Playbook::Props::Enum,
                           values: %w[xs sm md lg xl none rounded],
                           default: "md"
      prop :background, type: Playbook::Props::Enum,
                        values: %w[white light dark windows siding doors solar roofing gutters insulation],
                        default: "white"

      def classname
        generate_classname("pb_card_kit",
                           selected_class,
                           shadow_class,
                           highlight_position_class,
                           highlight_color_class,
                           background_class,
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

      def background_class
        background.present? ? "background_#{background}" : "background_white"
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
