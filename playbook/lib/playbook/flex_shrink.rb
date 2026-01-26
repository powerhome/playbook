# frozen_string_literal: true

module Playbook
  module FlexShrink
    def self.included(base)
      base.prop :flex_shrink
    end

    # rubocop:disable Style/IfInsideElse
    def flex_shrink_props
      selected_props = flex_shrink_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_shrink_value = send(k)
        if flex_shrink_value.is_a?(Hash)
          flex_shrink_value.map do |media_size, shrink_value|
            "flex_shrink_#{media_size}_#{shrink_value}" if flex_shrink_values.include? shrink_value.to_s
          end
        else
          "flex_shrink_#{flex_shrink_value}" if flex_shrink_values.include? flex_shrink_value.to_s
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

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
