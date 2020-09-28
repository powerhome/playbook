# frozen_string_literal: true

module Playbook
  module Props
    class Error < StandardError; end

    class Base
      attr_reader :default, :required

      def initialize(default: nil, required: false, name:)
        @default = default
        @required = required
        @name = name
      end

      def value(value)
        value.nil? ? @default : value
      end

      def validate!(input_value)
        raise(Playbook::Props::Error, "Prop '#{@name}' of type #{inspect.class} is required and needs to be provided a value") if required && input_value.nil?

        validate(value(input_value)) ||
          raise(Playbook::Props::Error, "Invalid value of '#{input_value.inspect}' for prop '#{@name}' of type #{inspect.class}")
      end

      def validate(_value)
        true
      end
    end
  end
end
