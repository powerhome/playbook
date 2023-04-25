# frozen_string_literal: true

module Playbook
  module PbBadge
    class Badge < Playbook::KitBase
      prop :rounded, type: Playbook::Props::Boolean, default: false
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
                     default: "neutral"

      def classname
        generate_classname("pb_badge_kit", variant_class, rounded_class)
      end

    private

      def variant_class
        variant === "success" ? "success_sm" : variant
      end

      def rounded_class
        rounded ? "rounded" : nil
      end
    end
  end
end
