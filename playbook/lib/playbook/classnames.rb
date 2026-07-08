# frozen_string_literal: true

module Playbook
  module Classnames
    def self.included(base)
      base.prop :classname
      base.prop :dark, type: Playbook::Props::Boolean, default: false
    end

    def generate_classname(*name_parts, separator: "_")
      css = +name_parts.compact.join(separator)
      append_classname(css, prop(:classname))

      # Spacing props (handles margin, padding, and width sub-props)
      append_classname(css, spacing_props)
      css << " dark" if dark
      append_classname(css, width_props)
      append_classname(css, min_width_props)
      append_classname(css, max_width_props)

      # Gap utilities
      append_classname(css, gap_props)
      append_classname(css, column_gap_props)
      append_classname(css, row_gap_props)

      # Single-value utilities
      append_classname(css, z_index_props)
      append_classname(css, number_spacing_props)
      append_classname(css, shadow_props)
      append_classname(css, line_height_props)
      append_classname(css, display_props)
      append_classname(css, cursor_props)

      # Flex utilities
      append_classname(css, flex_direction_props)
      append_classname(css, flex_wrap_props)
      append_classname(css, justify_content_props)
      append_classname(css, justify_self_props)
      append_classname(css, align_items_props)
      append_classname(css, align_content_props)
      append_classname(css, align_self_props)
      append_classname(css, flex_props)
      append_classname(css, flex_grow_props)
      append_classname(css, flex_shrink_props)
      append_classname(css, order_props)

      # Position and layout
      append_classname(css, position_props)
      append_classname(css, hover_props)
      append_classname(css, border_radius_props)
      append_classname(css, text_align_props)
      append_classname(css, overflow_props)
      append_classname(css, truncate_props)
      append_classname(css, left_props)
      append_classname(css, top_props)
      append_classname(css, right_props)
      append_classname(css, bottom_props)
      append_classname(css, vertical_align_props)
      append_classname(css, border_props)

      # Height utilities
      append_classname(css, height_props)
      append_classname(css, min_height_props)
      append_classname(css, max_height_props)
      css
    end

    def generate_classname_without_spacing(*name_parts, separator: "_")
      css = +name_parts.compact.join(separator)
      append_classname(css, prop(:classname))
      css
    end

    def dark_props
      dark ? "dark" : nil
    end

  private

    # Appends a CSS class string to the accumulator if the value is present.
    # Used by generate_classname to conditionally add utility prop classes.
    def append_classname(css, value)
      css << " " << value if value
    end
  end
end
