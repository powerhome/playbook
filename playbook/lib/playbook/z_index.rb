# frozen_string_literal: true

module Playbook
  module ZIndex
    def self.included(base)
      base.prop :z_index
    end

    def z_index_values
      %w[1 2 3 4 5 6 7 8 9 10 max]
    end

    def z_index_options
      {
        z_index: "z-index",
      }
    end

    def screen_size_values
      %w[xs sm md lg xl]
    end

    def z_index_props
      selected_props = z_index_options.keys.select { |sk| try(sk) }
      return nil unless selected_props.present?

      responsive = selected_props.present? && try(:z_index).is_a?(::Hash)
      css = ""
      if responsive
        z_index_value = send(:z_index)
        z_index_value.each do |key, value|
          css += "z_index_#{key}_#{value} " if screen_size_values.include?(key.to_s) && z_index_values.include?(value.to_s)
        end
      else
        selected_props.each do |k|
          z_index_value = send(k)
          css += "z_index_#{z_index_value} " if z_index_values.include? z_index_value
        end
      end

      css unless css.blank?
    end
  end
end
