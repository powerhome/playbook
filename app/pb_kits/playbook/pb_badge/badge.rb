# frozen_string_literal: true

module Playbook
  module PbBadge
    class Badge
      include Playbook::Props

      partial "pb_badge/badge"

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :rounded, type: Playbook::Props::Boolean, default: false
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
                     default: "neutral"

      def classname
        generate_classname("pb_badge_kit", variant, rounded_class, dark_class)
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def rounded_class
        rounded ? "rounded" : nil
      end
    end
  end
end
