# frozen_string_literal: true

module Playbook
  module PbButton
    class Button
      include Playbook::Props

      partial "pb_button/button"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
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

      def options
        {
          id: id,
          data: data,
          class: classname,
          disabled: disabled,
          aria: aria,
          type: type,
          value: value,
        }.compact
      end

      def link_options
        options.merge(
          href: link,
          target: new_window ? "_blank" : "_self"
        )
      end

      def tag
        link ? "a" : "button"
      end

    private

      def classname
        generate_classname("pb_button_kit", variant, full_width_class, disabled_class, loading_class, dark_class)
      end

      def dark_class
        dark ? "dark" : nil
      end

      def disabled_class
        disabled ? "disabled" : "enabled"
      end

      def full_width_class
        full_width ? "block" : "inline"
      end

      def loading_class
        loading ? "loading" : nil
      end
    end
  end
end
