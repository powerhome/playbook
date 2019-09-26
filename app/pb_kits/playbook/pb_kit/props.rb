# frozen_string_literal: true

module Playbook
  module PbKit
    module Props
      class Prop
        def initialize(default: nil)
          @default = default
        end

        def value(value)
          value || @default
        end

        def validate!(value)
        end
      end

      extend ActiveSupport::Concern

      def initialize(prop_values)
        @values = prop_values
        self.class.props.each do |key, definition|
          definition.validate! @values[key]
        end
      end

      def prop(name)
        self.class.props[name].value @values[name]
      end

      included do
        prop :id
        prop :data, default: {}
        prop :classname
        prop :aria, default: {}
      end

      class_methods do
        def props
          @props
        end

        def prop(name, **options)
          @props ||= {}
          @props[name] = Prop.new(**options)

          define_method(name) { prop(name) }
        end
      end
    end
  end
end
