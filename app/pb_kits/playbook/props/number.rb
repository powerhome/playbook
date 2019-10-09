# frozen_string_literal: true

module Playbook
  module Props
    class Number < Playbook::Props::Base
      def validate(value)
        value.is_a?(Integer)
      end
    end
  end
end
