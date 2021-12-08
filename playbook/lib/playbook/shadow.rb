# frozen_string_literal: true

module Playbook
  module Shadow
    def self.included(base)
      base.prop :shadow
    end

    def shadow_props
      selected_props = shadow_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        shadow_value = send(k)
        "shadow_#{shadow_value}" if shadow_values.include? shadow_value
      end.compact.join(" ")
    end

    def shadow_options
      {
        shadow: "shadow",
      }
    end

    def shadow_values
      %w[none deep deeper deepest]
    end
  end
end
