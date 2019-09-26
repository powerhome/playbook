# frozen_string_literal: true

module Playbook
  module PbTextInput
    class TextInput < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_disabled
                 configured_error
                 configured_id
                 configured_label
                 configured_name
                 configured_placeholder
                 configured_value].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     disabled: default_configuration,
                     error: default_configuration,
                     id: default_configuration,
                     label: default_configuration,
                     name: default_configuration,
                     placeholder: default_configuration,
                     value: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_disabled = disabled
        self.configured_error = error
        self.configured_id = id
        self.configured_label = label
        self.configured_name = name
        self.configured_placeholder = placeholder
        self.configured_value = value
      end

      def disabled
        true_value(configured_disabled, "true value", "false value")
      end

      def error
        true_value(configured_error, "true value", "false value")
      end

      def label
        default_value(configured_label, "")
      end

      def name
        default_value(configured_name, "")
      end

      def place_holder
        default_value(configured_place_holder, "")
      end

      def value
        default_value(configured_value, "")
      end

      def to_partial_path
        "pb_text_input/text_input"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
