# frozen_string_literal: true

module Playbook
  module Props
    class Percentage < Playbook::Props::Base
      def validate(value)
        value.nil? || numeric_in_range?(value)
      end

    private

      def numeric_in_range?(value)
        (value.is_a?(::Numeric) &&
          value <= 100 &&
          value >= 0)
      end
    end
  end
end
