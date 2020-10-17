# frozen_string_literal: true

module Playbook
  module Props
    class Enum < Playbook::Props::Base
      attr_reader :values

      def initialize(values:, **options)
        super(**options)
        @values = values
      end

      def validate(value)
        @values.include?(value)
      end
    end
  end
end
