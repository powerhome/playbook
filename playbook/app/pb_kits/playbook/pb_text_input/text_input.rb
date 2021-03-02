# frozen_string_literal: true

module Playbook
  module PbTextInput
    class TextInput < Playbook::KitBase
      prop :autocomplete, type: Playbook::Props::Boolean,
                          default: true
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
      prop :add_on, type: Playbook::Props::AddOnHash,
                        default: {}

      def classname
        generate_classname("pb_text_input_kit") + error_class
      end

      def validation_message
        validation[:message] || ""
      end

      def validation_pattern
        validation[:pattern] || nil
      end

      def validation_data
        fields = {}
        fields[:message] = validation_message unless validation_message.blank?
        fields
      end

      def add_on_data
        return {} if add_on[:icon].empty? && add_on[:text].empty?

        fields = {}
        fields[:icon] = add_on[:icon] unless add_on[:icon].blank?
        fields[:text] = add_on[:text] unless add_on[:text].blank?
        fields[:border] = add_on[:border] || true
        fields[:alignment] = add_on[:alignment] || "RIGHT" # TODO handle enum
        fields
      end

    private

      def error_class
        error ? " error" : ""
      end
    end
  end
end
