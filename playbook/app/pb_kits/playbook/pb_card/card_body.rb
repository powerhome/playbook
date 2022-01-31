# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody < Playbook::KitBase
      def classname
        generate_classname("pb_card_body_kit", padding, flex_direction, justify_content, flex_wrap, justify_self, align_items, align_content, align_self, flex, separator: " ")
      end
    end
  end
end
