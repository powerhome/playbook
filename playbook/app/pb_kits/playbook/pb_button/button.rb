# frozen_string_literal: true

module Playbook
  module PbButton
    class Button < Playbook::KitBase
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :full_width, type: Playbook::Props::Boolean,
                        default: false
      prop :icon
      prop :icon_right, type: Playbook::Props::Boolean,
                        default: false
      prop :link
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[primary secondary link danger reaction],
                     default: "primary"
      prop :count, type: Playbook::Props::Number
      prop :highlight, type: Playbook::Props::Boolean,
                       default: false
      prop :target
      prop :text
      prop :type
      prop :value
      prop :size, type: Playbook::Props::Enum,
                  values: ["sm", "md", "lg", nil],
                  default: nil
      prop :form, default: nil
      prop :icon_font_family, type: Playbook::Props::Enum,
                              values: %w[far fas fab fak],
                              default: "far"

      def options
        options = {
          class: classname,
          disabled: disabled,
          id: id,
          role: "button",
          tabindex: 0,
          type: type,
          value: value,
          form: form,
        }.compact
        combined_html_options.merge!(options) if combined_html_options.present?
      end

      def target_attribute
        if target && link
          target
        elsif new_window
          "_blank"
        end
      end

      def link_options
        options.tap do |option|
          option[:href] = link
          option[:role] = "link"
          option[:target] = target_attribute if target_attribute.present?
          option[:tabindex] = 0
        end
      end

      def tag
        link && !disabled ? "a" : "button"
      end

      def valid_emoji(icon)
        emoji_regex = /\p{Emoji}/
        emoji_regex.match?(icon)
      end

      def classname
        class_names = ["pb_button_kit"]
        class_names << "pb_button_#{variant}" if variant
        class_names << "pb_button_#{full_width_class}"
        class_names << "pb_button_#{disabled_class}"
        class_names << "pb_button_loading" if loading
        class_names << "pb_button_size_#{size}" if size
        class_names << "pb_button_reaction_default" if variant === "reaction" && icon && !valid_emoji(icon)
        class_names << "pb_button_active" if variant === "reaction" && highlight

        class_names.join(" ")
      end

    private

      def disabled_class
        disabled ? "disabled" : "enabled"
      end

      def full_width_class
        full_width ? "block" : "inline"
      end

      def spinner_path
        "app/pb_kits/playbook/utilities/icons/spinner.svg"
      end
    end
  end
end
