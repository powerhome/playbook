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
      prop :add_on, type: Playbook::Props::TextInputAddOn,
                    default: {}

      def classname
        generate_classname("pb_text_input_kit") + error_class
      end

      def add_on_class
        add_on[:icon] ? "text_input_wrapper_add_on " : ""
      end

      def input_tag
        tag(:input, input_options)
      end

      def should_show_add_on?
        add_on[:icon].present?
      end

      def input_tag_with_add_on
        input = []
        if add_on[:alignment] == 'left'
          input << pb_rails("icon", props: { icon: add_on[:icon] })
          input << pb_rails("section_separator", props: { orientation: "vertical" }) if add_on[:border]
          input << input_tag
        elsif add_on[:alignment] == 'right'
          input << input_tag
          input << pb_rails("section_separator", props: { orientation: "vertical" }) if add_on[:border]
          input << pb_rails("icon", props: { icon: add_on[:icon] })
        end
        input.join(' ').html_safe
      end

    private

      def input_options
        {
          autocomplete: autocomplete ? nil : "off",
          class: "text_input",
          data: validation_data,
          disabled: disabled,
          id: id,
          name: name,
          pattern: validation_pattern,
          placeholder: placeholder,
          required: required,
          type: type,
          value: value
        }
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

      def error_class
        error ? " error" : ""
      end
    end
  end
end
