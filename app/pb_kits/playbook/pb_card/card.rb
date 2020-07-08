# frozen_string_literal: true

module Playbook
  module PbCard
    class Card
      include Playbook::Props

      partial "pb_card/card"

      prop :selected, type: Playbook::Props::Boolean, default: false
      prop :shadow, type: Playbook::Props::Enum,
                    values: %w[none deep deeper deepest],
                    default: "none"
      prop :highlight, type: Playbook::Props::Hash,
                       default: {}
      prop :dark, type: Playbook::Props::Boolean,
                 default: false
      prop :border, type: Playbook::Props::Boolean,
                    default: true

      def classname
        generate_classname("pb_card_kit",
                           selected_class,
                           shadow_class,
                           highlight_position_class,
                           highlight_color_class,
                           dark_class,
                           border_class)
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

      def dark_class
        dark ? "dark" : nil
      end

      def border_class
        border == false ? "border_none" : nil
      end
    end
  end
end
