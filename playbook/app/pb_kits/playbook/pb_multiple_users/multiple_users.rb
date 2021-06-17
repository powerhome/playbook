# frozen_string_literal: true

module Playbook
  module PbMultipleUsers
    class MultipleUsers < Playbook::KitBase
      prop :reverse, type: Playbook::Props::Boolean, default: false
      prop :size, type: Playbook::Props::String, default: "xs"
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

      def avatar_size(size = 'xs')
        return data[:size] = "xs" if size.blank? || size == "xs"

        data[:size] = "xxs"
      end

    private

      def reverse_class
        reverse ? "reverse" : nil
      end
    end
  end
end
