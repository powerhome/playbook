# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody < Playbook::KitBase
      def classname
        generate_classname("pb_card_body_kit", padding, flex_direction, justify_content, flex_wrap, justify_self, separator: " ")
      end
    end
  end
end
