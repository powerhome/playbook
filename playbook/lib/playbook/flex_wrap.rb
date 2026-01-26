# frozen_string_literal: true

module Playbook
  module FlexWrap
    def self.included(base)
      base.prop :flex_wrap
    end

    # rubocop:disable Style/IfInsideElse
    def flex_wrap_props
      selected_props = flex_wrap_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_wrap_value = send(k)
        if flex_wrap_value.is_a?(Hash)
          flex_wrap_value.map do |media_size, wrap_value|
            "flex_wrap_#{media_size}_#{wrap_value.underscore}" if flex_wrap_values.include? wrap_value
          end
        else
          "flex_wrap_#{flex_wrap_value}" if flex_wrap_values.include? flex_wrap_value
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def flex_wrap_options
      {
        flex_wrap: "flex_wrap",
      }
    end

    def flex_wrap_values
      %w[wrap nowrap wrapReverse]
    end
  end
end
