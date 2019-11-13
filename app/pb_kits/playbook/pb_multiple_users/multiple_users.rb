# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers
      include Playbook::Props

      partial "pb_multiple_users/multiple_users"

      prop :users, type: Playbook::Props::HashArray, default: []

      def more_than_four
        users.count > 4
      end

      def classname
        generate_classname("pb_multiple_users_kit")
      end
    end
  end
end
