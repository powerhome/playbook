# frozen_string_literal: true

module Playbook
  module FlexWrap
    def self.included(base)
      base.prop :flex_wrap
    end

    def flex_wrap_props
      selected_props = flex_wrap_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_wrap_value = send(k)
        "flex_wrap_#{flex_wrap_value}" if flex_wrap_values.include? flex_wrap_value
      end.compact.join(" ")
    end

    def flex_wrap_options
      {
        flex_wrap: "flex_wrap",
      }
    end

    def flex_wrap_values
      %w[wrap nowrap wrap_reverse]
    end
  end
end
