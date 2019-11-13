# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers
      include Playbook::Props

      partial "pb_multiple_users/multiple_users"

      prop :users, type: Playbook::Props::HashArray, default: []
      prop :reverse, type: Playbook::Props::Boolean, default: false

      def more_than_four
        users.count > 4
      end

      def classname
        generate_classname("pb_multiple_users_kit", reverse_class)
      end

      def reverse_class
        reverse ? "reverse" : nil
      end
    end
  end
end
