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
                     values: %w[royal blue purple teal red yellow green],
                     default: "royal"

        def classname
          generate_classname("pb_card_header_kit", padding, color)
        end
      end
    end
  end
  