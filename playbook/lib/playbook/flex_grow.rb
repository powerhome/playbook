# frozen_string_literal: true

module Playbook
  module FlexGrow
    def self.included(base)
      base.prop :flex_grow
    end

    # rubocop:disable Style/IfInsideElse
    def flex_grow_props
      selected_props = flex_grow_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_grow_value = send(k)
        if flex_grow_value.is_a?(Hash)
          flex_grow_value.map do |media_size, grow_value|
            "flex_grow_#{media_size}_#{grow_value}" if flex_grow_values.include? grow_value.to_s
          end
        else
          "flex_grow_#{flex_grow_value}" if flex_grow_values.include? flex_grow_value.to_s
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def flex_grow_options
      {
        flex_grow: "flex_grow",
      }
    end

    def flex_grow_values
      %w[1 0]
    end
  end
end
