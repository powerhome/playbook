# frozen_string_literal: true

module Playbook
  module PbButton
    class Button < Playbook::KitBase
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :full_width, type: Playbook::Props::Boolean,
                        default: false
      prop :link
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[primary secondary link],
                     default: "primary"
      prop :text
      prop :type
      prop :value
      prop :size, type: Playbook::Props::Enum,
                  values: ["sm", "md", "lg", nil],
                  default: nil

      def options
        {
          aria: aria,
          class: classname,
          data: data,
          disabled: disabled,
          id: id,
          role: "button",
          type: type,
          value: value,
        }.compact
      end

      def link_options
        options.merge(
          href: link,
          role: "link",
          target: new_window ? "_blank" : "_self"
        )
      end

      def tag
        link ? "a" : "button"
      end

      def classname
        button_class = generate_classname("pb_button_kit", variant, full_width_class, disabled_class, loading_class)
        button_class + size_class
      end

    private

      def disabled_class
        disabled ? "disabled" : "enabled"
      end

      def full_width_class
        full_width ? "block" : "inline"
      end

      def loading_class
        loading ? "loading" : nil
      end

      def size_class
        size ? " size_#{size}" : ""
      end
    end
  end
end
