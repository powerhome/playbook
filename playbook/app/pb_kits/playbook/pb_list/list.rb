# frozen_string_literal: true

module Playbook
  module PbList
    class List < Playbook::KitBase
      prop :borderless, type: Playbook::Props::Boolean,
                        default: false
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :enable_drag, type: Playbook::Props::Boolean,
                         default: false
      prop :items, type: Playbook::Props::Array,
                   default: []
      prop :layout, type: Playbook::Props::Enum,
                    values: ["left", "right", ""],
                    default: ""
      prop :size
      prop :ordered, type: Playbook::Props::Boolean,
                     default: false
      prop :xpadding, type: Playbook::Props::Boolean,
                      default: false
      prop :role
      prop :tabindex

      def list_classname
        generate_classname("pb_list_kit",
                           xpadding_class,
                           borderless_class,
                           dark_class,
                           size_class,
                           layout_class)
      end

      def ordered_class
        ordered ? "ol" : "ul"
      end

    private

      def borderless_class
        borderless ? "borderless" : nil
      end

      def dark_class
        dark ? "dark" : nil
      end

      def layout_class
        if layout == "right"
          "layout_right"
        elsif layout == "left"
          "layout_left"
        else
          ""
        end
      end

      def size_class
        size ? "large" : nil
      end

      def xpadding_class
        xpadding ? "xpadding" : nil
      end
    end
  end
end
