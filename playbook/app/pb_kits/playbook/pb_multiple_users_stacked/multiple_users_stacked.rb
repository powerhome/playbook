# frozen_string_literal: true

module Playbook
  module PbMultipleUsersStacked
    class MultipleUsersStacked < Playbook::KitBase
      prop :users, type: Playbook::Props::HashArray, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl],
                  default: "xs"

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

      def triple_bubble
        bubble && users.count === 3
      end

      def quadruple_bubble
        bubble && users.count > 3
      end

      def other_users_size
        bubble_size_map[size.to_sym]
      end

      def bubble_size_map
        {
          "xs": %w[xs xxs],
          "sm": %w[xs xxs],
          "md": %w[sm xs],
          "lg": %w[md sm],
          "xl": %w[lg md],
        }
      end

      def classname
        generate_classname("pb_multiple_users_stacked_kit", single_class, bubble_class, "size_#{size}")
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
