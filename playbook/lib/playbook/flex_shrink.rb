# frozen_string_literal: true

module Playbook
  module FlexShrink
    def self.included(base)
      base.prop :flex_shrink
    end

    def flex_shrink_props
      selected_props = flex_shrink_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_shrink_value = send(k)
        "flex_shrink_#{flex_shrink_value}" if flex_shrink_values.include? flex_shrink_value
      end.compact.join(" ")
    end

    def flex_shrink_options
      {
        flex_shrink: "flex_shrink",
      }
    end

    def flex_shrink_values
      %w[1 0]
    end
  end
end
