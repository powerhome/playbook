# frozen_string_literal: true

module Playbook
  module Props
    class Array < Playbook::Props::Base
      def validate(value)
        value.is_a?(::Array)
      end
    end
  end
end
