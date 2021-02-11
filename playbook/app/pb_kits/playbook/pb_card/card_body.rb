# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody < Playbook::KitBase
      def classname
        generate_classname("pb_card_body_kit", padding, separator: " ")
      end
    end
  end
end
