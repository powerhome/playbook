# frozen_string_literal: true

module Playbook
  module Flex
    def self.included(base)
      base.prop :flex
    end

    # rubocop:disable Style/IfInsideElse
    def flex_props
      selected_props = flex_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_value = send(k)
        if flex_value.is_a?(Hash)
          flex_value.map do |media_size, value|
            "flex_#{media_size}_#{value}" if flex_values.include? value.to_s
          end
        else
          "flex_#{flex_value}" if flex_values.include? flex_value.to_s
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def flex_options
      {
        flex: "flex",
      }
    end

    def flex_values
      %w[auto initial 0 1 2 3 4 5 6 7 8 9 10 11 12 none]
    end
  end
end
