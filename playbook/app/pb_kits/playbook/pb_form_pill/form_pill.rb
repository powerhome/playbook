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

      def classname
        generate_classname("pb_form_pill_kit", color, icon_class, name, text, text_transform)
      end

      def display_text
        object.text
      end

      def size_class
        size == "small" ? " small" : ""
      end

      def icon_class
        icon ? "icon" : nil
      end

      def close_icon_size
        size == "small" ? "xs" : "sm"
      end
    end
  end
end
