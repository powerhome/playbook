# frozen_string_literal: true

module Playbook
  module Props
    class Children < Playbook::Props::Base
      def validate(children)
        children.nil? || children.respond_to?(:call)
      end
    end
  end
end
