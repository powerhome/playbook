# frozen_string_literal: true

module Playbook
  module PbFlex
    class FlexItem < Playbook::KitBase
      prop :fixed_size, default: nil
      prop :grow, type: Playbook::Props::Boolean,
                  default: false
      prop :shrink, type: Playbook::Props::Boolean,
                    default: false
      prop :flex, type: Playbook::Props::Enum,
                  values: %w[0 1 2 3 4 5 6 7 8 9 10 11 12 none],
                  default: "none"

      def classname
        generate_classname("pb_flex_item_kit", fixed_size_class, grow_class, shrink_class, flex_class)
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

      def shrink_class
        shrink ? "shrink" : nil
      end

      def flex_class
        if flex == "none"
          nil
        else
          "flex_#{flex}"
        end
      end
    end
  end
end
