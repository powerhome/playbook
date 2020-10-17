# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody
      include Playbook::Props

      partial "pb_card/child_kits/card_body"

      def classname
        generate_classname("pb_card_body_kit", padding, separator: " ")
      end
    end
  end
end
