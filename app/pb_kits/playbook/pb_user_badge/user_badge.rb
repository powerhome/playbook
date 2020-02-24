# frozen_string_literal: true

module Playbook
  module PbUserBadge
    class UserBadge
      include Playbook::Props

      partial "pb_user_badge/user_badge"

      # prop :badge, type: Playbook::Props::Enum,
      #              values: %w[million-dollar veteran],
      #              default: "million-dollar"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "md"

      def classname
        generate_classname("pb_user_badge_kit", size)
      end

      # def display_badge
      #   "pb_user_badge/badges/#{badge}"
      # end
    end
  end
end
