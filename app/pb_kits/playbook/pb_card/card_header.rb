# frozen_string_literal: true

module Playbook
    module PbCard
      class CardHeader
        include Playbook::Props
  
        partial "pb_card/child_kits/card_header"
  
        prop :padding, type: Playbook::Props::Enum,
                       values: %w[none xs sm md lg xl],
                       default: "none"
        prop :color, type: Playbook::Props::Enum,
                     values: %w[category_1 category_2 category_3 category_4 category_5 category_6 category_7 
                     category_8 category_9 category_10 category_11 category_12 category_13 category_14 category_15
                     category_16 category_17 category_18 category_19 category_20 category_21],
                     default: "category_1"

        def classname
          generate_classname("pb_card_header_kit", padding, color)
        end
      end
    end
  end
  