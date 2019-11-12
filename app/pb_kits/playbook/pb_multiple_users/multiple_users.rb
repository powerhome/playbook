# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers
      include Playbook::Props

      partial "pb_multiple_users/multiple_users"

      prop :user, type: Playbook::Props::HashArray, default: []
      prop :user_one
      prop :user_two
      prop :user_three
      prop :user_four



      def more_than_four
        user.select {|user| user[:user_type] == "wrong number" }
      end

      def valid_contacts
        user.select {|user| user[:user_type] != "wrong number" }
      end

      def classname
        generate_classname("pb_person_contact_kit")
      end
    end
  end
end
