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
      prop :overflow, type: Playbook::Props::Enum,
                      values: %w[auto hidden inherit initial scroll visible] + [nil],
                      default: nil

      prop :order, type: Playbook::Props::Enum,
                   values: %w[1 2 3 4 5 6 7 8 9 10 11 12 first none],
                   default: "none"

      prop :align_self, type: Playbook::Props::Enum,
                        values: %w[start center end stretch] + [nil],
                        default: nil

      prop :display_flex, type: Playbook::Props::Boolean,
                          default: false

      def classname
        generate_classname("pb_flex_item_kit", fixed_size_class, grow_class, shrink_class, flex_class, display_flex_class) + overflow_class + order_class + align_self_class
      end

      def style_value
        "flex-basis: #{fixed_size};" if fixed_size.present?
      end

    private

      def align_self_class
        align_self ? "align_self_#{align_self}" : ""
      end

      def display_flex_class
        display_flex ? "display_flex" : nil
      end

      def fixed_size_class
        fixed_size.present? ? "fixed_size" : nil
      end

      def grow_class
        grow ? "grow" : nil
      end

      def overflow_class
        overflow ? " overflow_#{overflow}" : ""
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

      def order_class
        if order == "none"
          ""
        else
          "order_#{order}"
        end
      end
    end
  end
end
