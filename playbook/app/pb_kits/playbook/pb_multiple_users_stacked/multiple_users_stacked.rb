# frozen_string_literal: true

module Playbook
  module PbMultipleUsersStacked
    class MultipleUsersStacked < Playbook::KitBase
      prop :users, type: Playbook::Props::HashArray, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg xl],
                  default: "sm"

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

      def bubble
        variant == "bubble"
      end

      def double_bubble
        bubble && users.count === 2
      end

      def triple_bubble
        bubble && users.count === 3
      end

      def quadruple_bubble
        bubble && users.count > 3
      end

      def size_class
        "size_#{size}" if bubble
      end

      def classname
        generate_classname("pb_multiple_users_stacked_kit", single_class, bubble_class, size_class)
      end

    private

      def single_class
        only_one ? "single" : nil
      end

      def bubble_class
        bubble ? "bubble" : nil
      end
    end
  end
end
