# frozen_string_literal: true

module Playbook
  module PbOverlay
    class Overlay < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[card_light bg_light card_dark bg_dark],
                   default: "card_light"
      prop :layout, type: Playbook::Props::String,
                    default: { "bottom": "full" }

      def classname
        generate_classname("pb_overlay")
      end
    end
  end
end
