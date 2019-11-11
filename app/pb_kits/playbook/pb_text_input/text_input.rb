# frozen_string_literal: true

module Playbook
  module PbTextInput
    class TextInput
      include Playbook::Props

      partial "pb_text_input/text_input"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :label
      prop :name
      prop :placeholder
      prop :value
      prop :type, default: "text"

      def classname
        generate_classname("pb_text_input_kit", dark_class)
      end

      private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
