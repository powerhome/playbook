# frozen_string_literal: true

module Playbook
  module Props
    class Numeric < Playbook::Props::Base
      def validate(value)
        value.nil? ||
          value.is_a?(Integer) ||
          value.is_a?(Float)
      end
    end
  end
end
