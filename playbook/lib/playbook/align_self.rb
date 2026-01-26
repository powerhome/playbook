# frozen_string_literal: true

module Playbook
  module AlignSelf
    def self.included(base)
      base.prop :align_self
    end

    # rubocop:disable Style/IfInsideElse
    def align_self_props
      selected_props = align_self_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      selected_props.map do |k|
        align_self_value = send(k)
        if align_self_value.is_a?(Hash)
          align_self_value.map do |media_size, align_value|
            "align_self_#{media_size}_#{align_value}" if align_self_values.include? align_value
          end
        else
          "align_self_#{align_self_value}" if align_self_values.include? align_self_value
        end
      end.compact.join(" ")
      # rubocop:enable Style/IfInsideElse
    end

    def align_self_options
      {
        align_self: "align_self",
      }
    end

    def align_self_values
      %w[auto start end center stretch baseline]
    end
  end
end
