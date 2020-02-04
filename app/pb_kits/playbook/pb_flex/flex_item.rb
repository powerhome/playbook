# frozen_string_literal: true

module Playbook
  module PbFlex
    class FlexItem
      include Playbook::Props

      partial "pb_flex/flex_item"

      prop :fixed_size, default: nil
      prop :grow, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_flex_item_kit", fixed_size_class, grow_class)
      end

      def style_value
        "flex-basis: #{fixed_size};" if fixed_size.present?
      end

    private

      def fixed_size_class
        fixed_size.present? ? "fixed_size" : nil
      end

      def grow_class
        grow ? "grow" : nil
      end
    end
  end
end
