# frozen_string_literal: true

module Playbook
  module PbTextInput
    class TextInput
      include Playbook::Props

      partial "pb_text_input/text_input"

      prop :label
      prop :name
      prop :placeholder
      prop :value
      prop :type, default: "text"

      def classname
        generate_classname("pb_text_input_kit")
      end
    end
  end
end
