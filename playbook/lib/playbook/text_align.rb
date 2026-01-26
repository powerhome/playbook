# frozen_string_literal: true

module Playbook
  module TextAlign
    def self.included(base)
      base.prop :text_align
    end

    # rubocop:disable Style/IfInsideElse
    def text_align_props
      selected_props = text_align_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        text_align_value = send(k)
        if text_align_value.is_a?(Hash)
          text_align_value.map do |media_size, flex_value|
            "text_align_#{media_size}_#{flex_value.underscore}" if text_align_values.include? flex_value
          end
        else
          "text_align_#{text_align_value.underscore}" if text_align_values.include? text_align_value
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def text_align_options
      {
        text_align: "text_align",
      }
    end

    def text_align_values
      %w[start end left right center justify justify-all match-parent]
    end
  end
end
