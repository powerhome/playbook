# frozen_string_literal: true

module Playbook
  module TextAlign
    def self.included(base)
      base.prop :text_align
    end

    def text_align_props
      selected_props = text_align_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        text_align_value = send(k)
        "text_align_#{text_align_value}" if text_align_values.include? text_align_value
      end.compact.join(" ")
    end

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
