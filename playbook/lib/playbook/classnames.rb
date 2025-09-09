# frozen_string_literal: true

module Playbook
  module Classnames
    def self.included(base)
      base.prop :classname
      base.prop :dark, type: Playbook::Props::Boolean, default: false
    end

    def generate_classname(*name_parts, separator: "_")
      [
        name_parts.compact.join(separator),
        prop(:classname),
        spacing_props,
        dark_props,
        width_props,
        min_width_props,
        max_width_props,
        gap_props,
        column_gap_props,
        row_gap_props,
        z_index_props,
        number_spacing_props,
        shadow_props,
        line_height_props,
        display_props,
        cursor_props,
        flex_direction_props,
        flex_wrap_props,
        justify_content_props,
        justify_self_props,
        align_items_props,
        align_content_props,
        align_self_props,
        flex_props,
        flex_grow_props,
        flex_shrink_props,
        order_props,
        position_props,
        hover_props,
        border_radius_props,
        text_align_props,
        overflow_props,
        truncate_props,
        left_props,
        top_props,
        right_props,
        bottom_props,
        vertical_align_props,
        height_props,
        min_height_props,
        max_height_props,
      ].compact.join(" ")
    end

    def generate_classname_without_spacing(*name_parts, separator: "_")
      [
        name_parts.compact.join(separator),
        prop(:classname),
      ].compact.join(" ")
    end

  private

    def dark_props
      dark ? "dark" : nil
    end
  end
end
