# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableRow < Playbook::KitBase
      prop :table_id, type: Playbook::Props::String,
                      default: ""
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :row
      prop :depth
      prop :collapsible_trail, type: Playbook::Props::Boolean,
                               default: true
      prop :table_data_attributes, type: Playbook::Props::HashProp,
                                   default: {}
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :is_pinned_left, type: Playbook::Props::Boolean,
                            default: false
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :row_id, type: Playbook::Props::String,
                    default: ""
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :row_styling, type: Playbook::Props::Array,
                         default: []
      prop :last_row, type: Playbook::Props::Boolean,
                      default: false
      prop :immediate_parent_row_id, type: Playbook::Props::String,
                                     default: ""

      def data
        Hash(prop(:data)).merge(table_data_attributes)
      end

      def classname
        generate_classname("pb_table_tr", "bg-white", subrow_depth_classname, separator: " ")
      end

      def td_classname(column, index)
        classes = %w[id-cell]
        classes << "last-cell" if column[:is_last_in_group]
        classes << "pinned-left" if index.zero? && is_pinned_left && responsive == "scroll"

        row_style = row_styling.find { |style| style[:row_id].to_s == row_id.to_s }
        row_padding = row_style&.[](:cell_padding)

        if column[:accessor].present?
          orig_def = find_column_def_by_accessor(column_definitions, column[:accessor])
          column_padding = orig_def[:column_styling][:cell_padding] if orig_def && orig_def[:column_styling].is_a?(Hash) && orig_def[:column_styling][:cell_padding].present?
        end

        classes << "p_#{row_padding}" if row_padding.present?
        classes << "p_#{column_padding}" if column_padding.present?

        classes.join(" ")
      end

      def cell_background_color(column)
        return nil unless column[:accessor].present?

        orig_def = find_column_def_by_accessor(column_definitions, column[:accessor])
        if orig_def && orig_def[:column_styling].is_a?(Hash) && orig_def[:column_styling][:cell_background_color].present?
          bg_color = orig_def[:column_styling][:cell_background_color]
          if bg_color.respond_to?(:call)
            bg_color.call(row)
          else
            bg_color
          end
        end
      end

      def has_custom_background_color?(column)
        cell_background_color(column).present?
      end

      def cell_font_color(column)
        return nil unless column[:accessor].present?

        orig_def = find_column_def_by_accessor(column_definitions, column[:accessor])
        if orig_def && orig_def[:column_styling].is_a?(Hash) && orig_def[:column_styling][:font_color].present?
          font_color = orig_def[:column_styling][:font_color]
          if font_color.respond_to?(:call)
            font_color.call(row)
          else
            font_color
          end
        end
      end

      # Uses a regular table/table_cell component if there is no custom background color; if there is a cell_background_color uses a background component with tag "td"
      def cell_component_info(column, index, bg_color, font_color)
        column_font_color = cell_font_color(column)
        effective_font_color = column_font_color || font_color

        if has_custom_background_color?(column)
          custom_bg_color = cell_background_color(column)
          component_name = "background"
          component_props = {
            background_color: custom_bg_color,
            tag: "td",
            classname: td_classname(column, index),
          }
          component_props[:html_options] = { style: { color: effective_font_color } } if effective_font_color.present?
        else
          component_name = "table/table_cell"
          style_hash = { "background-color": bg_color }
          style_hash[:color] = effective_font_color if effective_font_color.present?
          component_props = {
            html_options: {
              style: style_hash,
            },
            classname: td_classname(column, index),
          }
        end

        { name: component_name, props: component_props }
      end

      def depth_accessors
        column_definitions.flat_map do |column|
          column[:cellAccessors] if column.key?(:cellAccessors)
        end.compact
      end

      # Selectable Rows No Subrows - checkboxes in their own first cell
      def render_checkbox_cell
        if selectable_rows
          prefix = table_id ? "#{table_id}-" : ""
          pb_rails("table/table_cell", props: {
                     classname: "checkbox-cell",
                   }) do
            pb_rails("checkbox", props: {
                       id: "#{prefix}select-row-#{row_id || row.object_id}",
                       indeterminate_parent: "#{table_id ? "#{table_id}-" : ''}select-all-rows",
                       name: "#{prefix}select-row-#{row_id || row.object_id}",
                       data: {
                         row_id: row_id || row.object_id.to_s,
                         flat_advanced_table_select: true,
                       },
                     })
          end
        end
      end

      # Selectable Rows w/ Subrows - checkboxes part of toggleable first cell
      def render_row_checkbox
        if selectable_rows
          prefix = table_id ? "#{table_id}-" : ""
          indeterminate_parent =
            if depth.zero?
              "#{prefix}select-all-rows"
            else
              "#{prefix}select-row-#{immediate_parent_row_id}"
            end

          pb_rails("checkbox", props: {
                     id: "#{prefix}select-row-#{row_id || row.object_id}",
                     indeterminate_main: !last_row,
                     indeterminate_main_labels: ["", ""],
                     indeterminate_parent: indeterminate_parent,
                     name: "#{prefix}select-row-#{row_id || row.object_id}",
                     data: {
                       row_id: row_id || row.object_id.to_s,
                     },
                   })
        end
      end

      def justify_for(column, index)
        if index.zero?
          "start"
        else
          case cell_alignment_for(column)
          when "left"   then "start"
          when "center" then "center"
          when "right"  then "end"
          else
            "end"
          end
        end
      end

    private

      def custom_renderer_value(column, index)
        return nil unless column[:accessor].present?

        if index.zero?
          if depth.zero?
            row[column[:accessor].to_sym]
          else
            depth_accessors.each_with_index do |item, accessor_index|
              key = item.to_sym
              return row[key] if depth - 1 == accessor_index
            end
            nil
          end
        else
          row[column[:accessor].to_sym]
        end
      end

      def subrow_depth_classname
        depth.positive? ? "depth-sub-row-#{depth}" : ""
      end

      def find_column_def_by_accessor(defs, target_accessor)
        defs.each do |col|
          return col if col[:accessor] == target_accessor

          if col[:columns].is_a?(Array)
            found = find_column_def_by_accessor(col[:columns], target_accessor)
            return found if found
          end
        end
        nil
      end

      def cell_alignment_for(column)
        return nil unless column[:accessor]

        orig_def = find_column_def_by_accessor(column_definitions, column[:accessor])
        orig_def[:column_styling][:cell_alignment] if orig_def && orig_def[:column_styling].is_a?(Hash)
      end
    end
  end
end
