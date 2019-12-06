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

      def classname
        generate_classname("pb_card_kit", selected_class, shadow_class)
      end

    private

      def selected_class
        selected ? "selected" : "deselected"
      end

      def shadow_class
        shadow != "none" ? "shadow_#{shadow}" : nil
      end
    end
  end
end
