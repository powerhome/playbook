# frozen_string_literal: true

module Playbook
  module PbPill
    class Pill < Playbook::KitBase
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
                     default: "neutral"
      prop :text_transform, type: Playbook::Props::Enum,
                            values: %w[none lowercase],
                            default: "lowercase"

      def classname
        generate_classname("pb_pill_kit", variant, text_transform)
      end

      def display_text
        object.text
      end
    end
  end
end
