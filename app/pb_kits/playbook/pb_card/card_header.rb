# frozen_string_literal: true

module Playbook
    module PbCard
      class CardHeader
        include Playbook::Props
  
        partial "pb_card/child_kits/card_header"
  
        prop :category_color, type: Playbook::Props::Numeric,
                              default: 1

        def classname
          generate_classname("pb_card_header_kit", padding, "category_#{category_color}")
        end
      end
    end
  end
  