# frozen_string_literal: true

module Playbook
  module Props
    class NestedProps < Playbook::Props::Base
      def initialize(nested_kit:, **kwargs)
        super **kwargs
        @nested_kit = nested_kit
      end

      def validate(values)
        @nested_kit.props.each do |prop_key, definition|
          definition.validate! definition.value(values[prop_key])
        end
      rescue Playbook::Props::Error
        false
      end
    end
  end
end
