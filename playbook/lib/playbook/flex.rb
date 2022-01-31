# frozen_string_literal: true

module Playbook
  module Flex
    def self.included(base)
      base.prop :flex
    end

    def flex_props
      selected_props = flex_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        flex_value = send(k)
        "flex_#{flex_value}" if flex_values.include? flex_value
      end.compact.join(" ")
    end

    def flex_options
      {
        flex: "flex",
      }
    end

    def flex_values
      %w[auto initial none 1]
    end
  end
end
