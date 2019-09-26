# frozen_string_literal: true

module Playbook
  module Props
    class Error < StandardError
    end

    class Base
      def initialize(default: nil)
        @default = default
      end

      def value(value)
        value || @default
      end

      def validate!(input_value)
        validate(value(input_value)) || raise(Playbook::Props::Error, "Invalid value (#{input_value.inspect}) for prop (#{inspect})")
      end

      def validate(_value)
        true
      end
    end
  end
end
