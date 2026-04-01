# frozen_string_literal: true

module Playbook
  module Overflow
    def self.included(base)
      base.prop :overflow
      base.prop :overflow_x
      base.prop :overflow_y
    end

    OVERFLOW_VALUES = %w[visible hidden scroll auto].freeze

    def overflow_values
      OVERFLOW_VALUES
    end

    def overflow_options
      { overflow: "overflow", overflow_x: "overflow_x", overflow_y: "overflow_y" }
    end

    def overflow_props
      ov = overflow
      ox = overflow_x
      oy = overflow_y
      return nil unless ov || ox || oy

      css = +""
      css << "overflow_#{ov} " if ov && OVERFLOW_VALUES.include?(ov)
      css << "overflow_x_#{ox} " if ox && OVERFLOW_VALUES.include?(ox)
      css << "overflow_y_#{oy} " if oy && OVERFLOW_VALUES.include?(oy)
      css.strip unless css.empty?
    end
  end
end
