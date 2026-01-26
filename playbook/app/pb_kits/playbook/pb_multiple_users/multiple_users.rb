# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers < Playbook::KitBase
      prop :reverse, type: Playbook::Props::Boolean, default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xxs xs],
                  default: "xs"
      prop :users, type: Playbook::Props::HashArray, required: true
      prop :with_tooltip, type: Playbook::Props::Boolean, default: false

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
