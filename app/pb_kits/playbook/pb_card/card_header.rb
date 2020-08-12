# frozen_string_literal: true

module Playbook
    module PbCard
      class CardHeader
        include Playbook::Props
  
        partial "pb_card/child_kits/card_header"
  
        prop :header_color, type: Playbook::Props::String,
                            default: "category_1"

        def classname
          generate_classname("pb_card_header_kit", header_color)
        end
      end
    end
  end
  