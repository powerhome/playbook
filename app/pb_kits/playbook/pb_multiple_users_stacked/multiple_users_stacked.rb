# frozen_string_literal: true

module Playbook
  module PbMultipleUsersStacked
    class MultipleUsersStacked
      include Playbook::Props

      partial "pb_multiple_users_stacked/multiple_users_stacked"

      prop :users, type: Playbook::Props::HashArray, required: true

      def more_than_two
        users.count > 2
      end

      def display_count
        more_than_two ? 1 : users.count
      end

      def classname
        generate_classname("pb_multiple_users_stacked_kit")
      end

    private

    end
  end
end
