# frozen_string_literal: true

module Playbook
  module Props
    class Time < Playbook::Props::Base
      def validate(value)
        value.is_a?(::Time) || value.is_a?(::DateTime)
      end
    end
  end
end
