# frozen_string_literal: true

module Playbook
  module Props
    class Error < StandardError; end

    class Base
      attr_reader :default, :required, :name, :kit

      def initialize(default: nil, required: false, name:, kit:)
        @default = default
        @required = required
        @name = name
        @kit = kit
      end

      def value(value)
        value.nil? ? @default : value
      end

      def validate!(input_value)
        raise(Playbook::Props::Error, "#{kit} prop '#{name}' of type #{inspect.class} is required and needs a value") if required && input_value.nil?

        validate(value(input_value)) ||
          raise(Playbook::Props::Error, "#{kit} has invalid value of '#{input_value.inspect}' for prop '#{name}' of type #{inspect.class}")
      end

      def validate(_value)
        true
      end
    end
  end
end
