# frozen_string_literal: true

module Playbook
  module AlignContent
    def self.included(base)
      base.prop :align_content
    end

    # rubocop:disable Style/IfInsideElse
    def align_content_props
      selected_props = align_content_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        align_content = send(k)
        if align_content.is_a?(Hash)
          align_content.map do |media_size, align_value|
            "align_content_#{media_size}_#{align_value.underscore}" if align_content_values.include? align_value
          end
        else
          "align_content_#{align_content.underscore}" if align_content_values.include? align_content
        end
      end.compact.join(" ")
    end
    # rubocop:enable Style/IfInsideElse

    def align_content_options
      {
        align_content: "align_content",
      }
    end

    def align_content_values
      %w[start end center spaceBetween spaceAround spaceEvenly]
    end
  end
end
