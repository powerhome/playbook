# frozen_string_literal: true

module Playbook
  module PbTextInput
    class TextInput
      include Playbook::Props

      partial "pb_text_input/text_input"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :error
      prop :label
      prop :name
      prop :placeholder
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :type, default: "text"
      prop :validation, type: Playbook::Props::Hash,
                        default: {}
      prop :value

      def classname
        generate_classname("pb_text_input_kit", dark_class) + error_class
      end

      def validation_message
        validation[:message] || ""
      end

      def validation_pattern
        validation[:pattern] || ""
      end

      def data
        fields = {}
        fields[:message] = validation_message unless validation_message.blank?
        fields
      end

    private

      def error_class
        error ? " error" : ""
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
