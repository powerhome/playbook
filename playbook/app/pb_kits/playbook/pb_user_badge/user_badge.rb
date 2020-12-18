# frozen_string_literal: true

module Playbook
  module PbUserBadge
    class UserBadge < Playbook::KitBase
      prop :badge, type: Playbook::Props::Enum,
                   values: %w[million-dollar veteran],
                   default: "million-dollar"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "md"

      def classname
        generate_classname("pb_user_badge_kit", size)
      end

      def display_badge
        @badge ||= begin
          badge_path = File.join(
            File.dirname(self.class.source_location),
            "badges",
            "#{badge}.svg"
          )
          File.read(badge_path).html_safe
        end
      end
    end
  end
end
