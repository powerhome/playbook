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

      def only_one
        users.count == 1
      end

      def display_count
        more_than_two ? 1 : users.count
      end

      def classname
        generate_classname("pb_multiple_users_stacked_kit", single_class)
      end

    private

      def single_class
        only_one ? "single" : nil
      end
    end
  end
end
