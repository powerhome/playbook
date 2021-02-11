# frozen_string_literal: true

module Playbook
  module PbPill
    class Pill < Playbook::KitBase
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
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
