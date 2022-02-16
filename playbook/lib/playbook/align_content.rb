# frozen_string_literal: true

module Playbook
  module AlignContent
    def self.included(base)
      base.prop :align_content
    end

    def align_content_props
      selected_props = align_content_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        align_content_value = send(k)
        "align_content_#{align_content_value}" if align_content_values.include? align_content_value
      end.compact.join(" ")
    end

    def align_content_options
      {
        align_content: "align_content",
      }
    end

    def align_content_values
      %w[start end center space_between space_around space_evenly]
    end
  end
end
