# frozen_string_literal: true

module Playbook
  module Props
    class HashArray < Playbook::Props::Base
      def validate(value)
        return false unless value.is_a?(::Array)
        return false if value.empty?

        value.all?(::Hash)
      end
    end
  end
end
