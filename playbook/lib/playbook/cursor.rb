# frozen_string_literal: true

module Playbook
  module Cursor
    def self.included(base)
      base.prop :cursor
    end

    CURSOR_VALUES = %w[auto default none contextMenu help pointer progress wait cell crosshair text verticalText alias copy move noDrop notAllowed grab grabbing eResize nResize neResize nwResize sResize seResize swResize wResize ewResize nsResize neswResize nwseResize colResize rowResize allScroll zoomIn zoomOut].freeze

    def cursor_props
      value = cursor
      return nil unless value

      "cursor_#{value.underscore}" if CURSOR_VALUES.include?(value)
    end

    def cursor_options
      { cursor: "cursor" }
    end

    def cursor_values
      CURSOR_VALUES
    end
  end
end
