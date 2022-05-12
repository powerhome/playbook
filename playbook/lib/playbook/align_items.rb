# frozen_string_literal: true

module Playbook
  module AlignItems
    def self.included(base)
      base.prop :align_items
    end

    # rubocop:disable Style/IfInsideElse
    def align_items_props
      selected_props = align_items_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        align_items_value = send(k)
        if align_items_value.is_a?(Hash)
          align_items_value.map do |media_size, align_value|
            "align_items_#{media_size}_#{align_value.underscore}" if align_items_values.include? align_value.to_s
          end
        else
          "align_items_#{align_items_value.underscore}" if align_items_values.include? align_items_value
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def align_items_options
      {
        align_items: "align_items",
      }
    end

    def align_items_values
      %w[flexStart flexEnd start end center baseline stretch]
    end
  end
end
