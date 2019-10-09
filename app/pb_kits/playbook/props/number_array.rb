# frozen_string_literal: true

module Playbook
  module Props
    class NumberArray < Playbook::Props::Base
      def validate(value)
        return false unless value.is_a?(Array)
        return false if value.empty?

        value.all?(Integer)
      end
    end
  end
end
