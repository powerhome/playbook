# frozen_string_literal: true

module Playbook
  module PbCard
    class Card
      include Playbook::Props

      partial "pb_card/card"

      prop :padding, type: Playbook::Props::Enum, values: %w[none xs sm md lg xl], default: "md"
      prop :selected, type: Playbook::Props::Boolean, default: false
      prop :shadow, type: Playbook::Props::Enum, values: %w[none shallow default deep deeper deepest], default: "none"

      def yield(context:)
        unless block.nil?
          pb_card_body = Playbook::PbCard::CardBody.new(padding: padding) do
            context.capture(&block)
          end
          ApplicationController.renderer.render(partial: pb_card_body, as: :object)
        end
      end

      def classname
        generate_classname("pb_card_kit", selected_class, shadow_class)
      end

      def to_partial_path
        "pb_card/card"
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
