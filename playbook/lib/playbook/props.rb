# frozen_string_literal: true

require "active_support/concern"

# Base must be defined first as other prop types inherit from it
require_relative "./props/base"

require_relative "./props/array"
require_relative "./props/boolean"
require_relative "./props/date"
require_relative "./props/enum"
require_relative "./props/hash"
require_relative "./props/hash_array"
require_relative "./props/number"
require_relative "./props/number_array"
require_relative "./props/numeric"
require_relative "./props/percentage"
require_relative "./props/proc"
require_relative "./props/string"
require_relative "./props/nested_props"

module Playbook
  module Props
    extend ActiveSupport::Concern

    attr_accessor :values
    private :values=

    def initialize(prop_values = {}, &block)
      # merge! avoids allocating a second Hash — mutates the literal in place
      self.values = { children: block }.merge!(Hash(prop_values))
      self.class.props.each do |key, definition|
        val = values[key]
        # Skip the 3-method-dispatch validate! chain for nil values on
        # non-required props. For a typical component, ~70 of ~77 props
        # are nil — this turns 210+ method dispatches into nil checks.
        next if val.nil? && !definition.required

        definition.validate! val
      end
    end

    def prop(name)
      val = values[name]
      if val.nil?
        self.class.props[name].default
      else
        val
      end
    end

    included do
      class_attribute :props, default: {}
    end

    class_methods do
      def clear_props
        props.keys.each { |prop_name| remove_method(prop_name) }
        props.clear
      end

      def prop(name, type: Playbook::Props::String, **options)
        definition = type.new(**options.merge(name: name, kit: self))
        default_val = definition.default
        self.props = props.merge(name => definition)

        # Inline the default lookup — avoids the self.class.props[name]
        # class_attribute lookup and .value() dispatch on every access.
        define_method(name) {
          val = values[name]
          val.nil? ? default_val : val
        }
      end

      def partial(path)
        define_method(:to_partial_path) { path }
      end
    end
  end
end
