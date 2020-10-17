# frozen_string_literal: true

module Playbook
  module Props
    class Date < Playbook::Props::Base
      def validate(value)
        value.is_a?(::Date)
      end
    end
  end
end
