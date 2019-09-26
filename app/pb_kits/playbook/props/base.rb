# frozen_string_literal: true

module Playbook
  module Props
    class Base
      def initialize(default: nil)
        @default = default
      end

      def value(value)
        value || @default
      end

      def validate!(_value)
      end
    end
  end
end
