# frozen_string_literal: true

module Playbook
  module PbCard
    class Card
      include Playbook::Props

      partial "pb_card/card"

      prop :selected, type: Playbook::Props::Boolean, default: false
      prop :padding, type: Playbook::Props::Enum,
                     values: %w[none xs sm md lg xl],
                     default: "md"
      prop :shadow, type: Playbook::Props::Enum,
                    values: %w[none shallow default deep deeper deepest],
                    default: "none"
      prop :highlight, type: Playbook::Props::Hash,
                       default: {}

      def classname
        generate_classname("pb_card_kit",
                           selected_class,
                           shadow_class,
                           highlight_position_class,
                           highlight_color_class)
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
    end
  end
end
