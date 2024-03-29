# frozen_string_literal: true

module Playbook
  module Props
    class HashProp < Playbook::Props::Base
      def validate(value)
        value.is_a?(::Hash)
      end
    end
  end
end
