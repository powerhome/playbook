# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers
      include Playbook::Props

      partial "pb_multiple_users/multiple_users"

      prop :reverse, type: Playbook::Props::Boolean, default: false
      prop :users, type: Playbook::Props::HashArray, required: true

      def more_than_four
        users.count > 4
      end

      def display_count
        more_than_four ? 3 : users.count
      end

      def classname
        generate_classname("pb_multiple_users_kit", reverse_class)
      end

    private

      def reverse_class
        reverse ? "reverse" : nil
      end
    end
  end
end
