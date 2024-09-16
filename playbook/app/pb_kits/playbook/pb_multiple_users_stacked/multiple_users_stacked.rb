# frozen_string_literal: true

module Playbook
  module PbMultipleUsersStacked
    class MultipleUsersStacked < Playbook::KitBase
      prop :users, type: Playbook::Props::HashArray, required: true

      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default bubble],
                     default: "default"

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
        generate_classname("pb_multiple_users_stacked_kit", single_class, bubble_class)
      end

    private

      def single_class
        only_one ? "single" : nil
      end

      def bubble_class
        variant == "bubble" ? "bubble" : nil
      end
    end
  end
end
