# frozen_string_literal: true

require "active_support/concern"
Dir[File.expand_path("./props/*.rb", __dir__)].each { |f| require f }

module Playbook
  module Props
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
      prop :id, default: nil
      prop :data, type: Playbook::Props::Hash, default: {}
      prop :classname, default: ""
      prop :aria, type: Playbook::Props::Hash, default: {}
    end

    class_methods do
      def props
        @props
      end

      def prop(name, type: Playbook::Props::String, **options)
        @props ||= {}
        @props[name] = type.new(**options)

        define_method(name) { prop(name) }
      end
    end
  end
end
