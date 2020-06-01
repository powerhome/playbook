# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody
      include Playbook::Props

      partial "pb_card/child_kits/card_body"

      # prop :padding, type: Playbook::Props::Enum,
      #                values: %w[none xs sm md lg xl],
      #                default: "md"

      def classname
        generate_classname("pb_card_body_kit", padding, separator: " ")
      end
    end
  end
end
