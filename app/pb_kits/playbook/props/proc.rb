# frozen_string_literal: true

module Playbook
  module Props
    class Proc < Playbook::Props::Base
      def validate(block)
        block.nil? || block.respond_to?(:call)
      end
    end
  end
end
