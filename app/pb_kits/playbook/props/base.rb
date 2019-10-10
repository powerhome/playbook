# frozen_string_literal: true

module Playbook
  module Props
    class Error < StandardError; end

    class Base
      attr_reader :default, :required

      def initialize(default: nil, required: false)
        @default = default
        @required = required
      end

      def value(value)
        value || @default
      end

      def validate!(input_value)
        raise(Playbook::Props::Error, "#{inspect} is a required prop and needs to be provided a value") if required && input_value.nil?

        validate(value(input_value)) ||
          raise(Playbook::Props::Error, "Invalid value (#{input_value.inspect}) for prop (#{inspect})")
      end

      def validate(_value)
        true
      end
    end
  end
end
