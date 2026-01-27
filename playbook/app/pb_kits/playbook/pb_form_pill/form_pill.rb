# frozen_string_literal: true

module Playbook
  module PbFormPill
    class FormPill < Playbook::KitBase
      prop :avatar_url
      prop :name
      prop :text
      prop :size

      prop :text_transform, type: Playbook::Props::Enum,
                            values: %w[none lowercase],
                            default: "none"
      prop :color, type: Playbook::Props::Enum,
                   values: %w[primary neutral success warning error info data_1 data_2 data_3 data_4 data_5 data_6 data_7 data_8 windows siding roofing doors gutters solar insulation accessories],
                   default: "primary"
      prop :tabindex
      prop :icon
      prop :wrapped, type: Playbook::Props::Boolean,
                     default: false

      def classname
        classes = []
        classes << (icon ? "pb_form_pill_kit_icon" : "pb_form_pill_kit")
        classes << "pb_form_pill_wrapped" if wrapped
        classes << "pb_form_pill_small" if size == "small"
        classes << "pb_form_pill_#{color}"
        classes << "pb_form_pill_#{text_transform}"
        classes.join(" ")
        generate_classname(classes.join(" "), separator: " ")
      end

      def display_text
        object.text
      end

      def size_class
        size == "small" ? " small" : ""
      end

      def icon_class
        icon ? "icon" : ""
      end

      def close_icon_size
        size == "small" ? "xs" : "sm"
      end

      def wrapped_class
        wrapped ? "wrapped" : nil
      end

      def truncate_props
        nil
      end
    end
  end
end
