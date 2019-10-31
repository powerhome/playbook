# frozen_string_literal: true

module Playbook
  module PbButton
    class Button
      include Playbook::Props

      partial "pb_button/button"

      prop :disabled, type: Playbook::Props::Enum,
                      values: %w[disabled enabled],
                      default: "enabled"
      prop :full_width, type: Playbook::Props::Enum,
                        values: %w[block inline],
                        default: "inline"
      prop :link
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :new_window
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[primary secondary link],
                     default: "primary"
      prop :tag
      prop :text
      prop :type
      prop :value

      def classname
        generate_classname("pb_button", variant, full_width, disabled_class)
      end

      def loading_icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "spinner",
                                             pulse: true,
                                             fixed_width: true,
                                             classname: "loading-icon")
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      # def new_window
      #   true_value(configured_new_window, "_blank", "_self")
      # end

      # def tag
      #   tag_options = %w[button a]
      #   if link.empty?
      #     one_of_value(configured_tag, tag_options, "button")
      #   else
      #     "a"
      #   end
      # end

      # def value
      #   configured_value unless configured_value == DEFAULT
      # end

    private

      def loading_class
        loading ? "loading" : nil
      end

      def disabled_class
        disabled ? "enabled" : "disabled"
      end
    end
  end
end
