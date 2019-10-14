# frozen_string_literal: true

module Playbook
  module PbPill
    class Pill
      include Playbook::Props

      partial "pb_pill/pill"

      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral],
                     default: "neutral"

      def classname
        generate_classname("pb_pill_kit", variant)
      end

      def display_text
        text.downcase
      end
    end
  end
end
