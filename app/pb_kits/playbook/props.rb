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
require_relative "./props/time"

module Playbook
  module Props
    extend ActiveSupport::Concern

    def initialize(prop_values = {}, &block)
      self.values = { children: block }.merge(Hash(prop_values))
      self.class.props.each do |key, definition|
        definition.validate! values[key]
      end
    end

    def prop(name)
      self.class.props[name].value values[name]
    end

    def generate_classname(*name_parts, separator: "_")
      [
        name_parts.compact.join(separator),
        prop(:classname),
      ].compact.join(" ")
    end

    attr_accessor :values
    private :values, :values=

    included do
      prop :id
      prop :data, type: Playbook::Props::Hash, default: {}
      prop :classname
      prop :aria, type: Playbook::Props::Hash, default: {}
      prop :children, type: Playbook::Props::Proc
    end

    class_methods do
      def props
        @props
      end

      def clear_props
        @props.keys.each { |prop_name| remove_method(prop_name) }
        @props.clear
      end

      def prop(name, type: Playbook::Props::String, **options)
        @props ||= {}
        @props[name] = type.new(**options)

        define_method(name) { prop(name) }
      end

      def partial(path)
        define_method(:to_partial_path) { path }
      end
    end
  end
end
