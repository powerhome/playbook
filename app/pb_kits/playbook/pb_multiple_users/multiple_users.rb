# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers
      include Playbook::Props

      partial "pb_multiple_users/multiple_users"

      prop :image_url
      prop :name, default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[1 2 3 4 ],
                  default: "1"

      def initials
        name.split.map(&:first).join.downcase
      end

      def classname
        generate_classname("pb_multiple_users_kit", size)
      end

    end
  end
end
