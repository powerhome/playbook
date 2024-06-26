# frozen_string_literal: true

module Playbook
  module VerticalAlign
    def self.included(base)
      base.prop :vertical_align
    end

    # rubocop:disable Style/IfInsideElse
    def vertical_align_props
      selected_props = vertical_align_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        vertical_align_value = send(k)
        if vertical_align_value.is_a?(Hash)
          vertical_align_value.map do |media_size, flex_value|
            "vertical_align_#{media_size}_#{flex_value.underscore}" if vertical_align_values.include? flex_value
          end
        else
          "vertical_align_#{vertical_align_value.underscore}" if vertical_align_values.include? vertical_align_value
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def vertical_align_options
      {
        vertical_align: "vertical_align",
      }
    end

    def vertical_align_values
      %w[baseline super top middle bottom sub text-top text-bottom]
    end
  end
end
