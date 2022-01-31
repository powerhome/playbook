# frozen_string_literal: true

module Playbook
  module AlignItems
    def self.included(base)
      base.prop :align_items
    end

    def align_items_props
      selected_props = align_items_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        align_items_value = send(k)
        "align_items_#{align_items_value}" if align_items_values.include? align_items_value
      end.compact.join(" ")
    end

    def align_items_options
      {
        align_items: "align_items",
      }
    end

    def align_items_values
      %w[start end center baseline stretch]
    end
  end
end
