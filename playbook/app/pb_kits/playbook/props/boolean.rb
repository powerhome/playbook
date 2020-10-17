# frozen_string_literal: true

module Playbook
  module Props
    class Boolean < Playbook::Props::Base
      def validate(value)
        value === true || value === false
      end
    end
  end
end
