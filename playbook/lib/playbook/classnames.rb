# frozen_string_literal: true

module Playbook
  module Classnames
    def self.included(base)
      base.prop :classname
      base.prop :dark, type: Playbook::Props::Boolean, default: false
    end

    def generate_classname(*name_parts, separator: "_")
      css = +name_parts.compact.join(separator)
      s = prop(:classname);  css << " " << s if s

      # Spacing props (handles 14 sub-props internally)
      s = spacing_props;     css << " " << s if s
      # Dark mode
      css << " dark" if dark
      # Width utilities
      s = width_props;       css << " " << s if s
      s = min_width_props;   css << " " << s if s
      s = max_width_props;   css << " " << s if s
      # Gap utilities
      s = gap_props;         css << " " << s if s
      s = column_gap_props;  css << " " << s if s
      s = row_gap_props;     css << " " << s if s
      # Single-value utilities
      s = z_index_props;     css << " " << s if s
      s = number_spacing_props; css << " " << s if s
      s = shadow_props;      css << " " << s if s
      s = line_height_props; css << " " << s if s
      s = display_props;     css << " " << s if s
      s = cursor_props;      css << " " << s if s
      # Flex utilities
      s = flex_direction_props; css << " " << s if s
      s = flex_wrap_props; css << " " << s if s
      s = justify_content_props; css << " " << s if s
      s = justify_self_props; css << " " << s if s
      s = align_items_props; css << " " << s if s
      s = align_content_props; css << " " << s if s
      s = align_self_props;  css << " " << s if s
      s = flex_props;        css << " " << s if s
      s = flex_grow_props;   css << " " << s if s
      s = flex_shrink_props; css << " " << s if s
      s = order_props;       css << " " << s if s
      # Position and layout
      s = position_props;    css << " " << s if s
      s = hover_props;       css << " " << s if s
      s = border_radius_props; css << " " << s if s
      s = text_align_props;  css << " " << s if s
      s = overflow_props;    css << " " << s if s
      s = truncate_props;    css << " " << s if s
      s = left_props;        css << " " << s if s
      s = top_props;         css << " " << s if s
      s = right_props;       css << " " << s if s
      s = bottom_props;      css << " " << s if s
      s = vertical_align_props; css << " " << s if s
      # Height utilities
      s = height_props;      css << " " << s if s
      s = min_height_props;  css << " " << s if s
      s = max_height_props;  css << " " << s if s
      css
    end

    def generate_classname_without_spacing(*name_parts, separator: "_")
      css = +name_parts.compact.join(separator)
      s = prop(:classname)
      css << " " << s if s
      css
    end
  end
end
