# frozen_string_literal: true

module Playbook
  module GridAutoFlow
    def self.included(base)
      base.prop :grid_auto_flow
    end

    GRID_AUTO_FLOW_VALUES = %w[row column dense rowDense columnDense].freeze
    SCREEN_SIZES = %w[xs sm md lg xl].freeze

    def grid_auto_flow_props
      value = grid_auto_flow
      return nil unless value

      if value.is_a?(::Hash)
        css = +""
        css << "grid_auto_flow_#{value[:default].underscore} " if value.key?(:default) && GRID_AUTO_FLOW_VALUES.include?(value[:default])
        value.each do |media_size, flow_value|
          css << "grid_auto_flow_#{media_size}_#{flow_value.underscore} " if SCREEN_SIZES.include?(media_size.to_s) && GRID_AUTO_FLOW_VALUES.include?(flow_value)
        end
        css.strip unless css.empty?
      elsif GRID_AUTO_FLOW_VALUES.include?(value)
        "grid_auto_flow_#{value.underscore}"
      end
    end

    def grid_auto_flow_options
      { grid_auto_flow: "grid_auto_flow" }
    end

    def grid_auto_flow_values
      GRID_AUTO_FLOW_VALUES
    end
  end
end
