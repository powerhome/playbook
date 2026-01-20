# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableHeader < Playbook::KitBase
      prop :table_id, type: Playbook::Props::String,
                      default: ""
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :show_actions_bar, type: Playbook::Props::Boolean,
                              default: true
      prop :inline_row_loading, type: Playbook::Props::Boolean,
                                default: false
      prop :persist_toggle_expansion_button, type: Playbook::Props::Boolean,
                                             default: false
      prop :table_data, type: Playbook::Props::Array,
                        default: []

      def classname
        additional_classes = []
        additional_classes << "advanced-table-responsive-#{responsive} pinned-left" if responsive == "scroll"
        additional_classes << "selectable-rows-enabled" if selectable_rows && enable_toggle_expansion == "none"

        generate_classname("pb_advanced_table_header", "pb_table_thead", *additional_classes, separator: " ")
      end

      def th_classname(is_first_column: false)
        additional_classes = []
        additional_classes << "pinned-left" if is_first_column && responsive == "scroll" && !selectable_rows
        additional_classes << "header-cells-with-actions" if selectable_rows && show_actions_bar

        generate_classname("table-header-cells", *additional_classes, separator: " ")
      end

      def header_rows
        wrapped_columns = wrap_leaf_columns(column_definitions)

        rows = []
        max_depth = compute_max_depth(wrapped_columns)
        max_depth.times { rows << [] }
        process_columns(wrapped_columns, rows, 0, max_depth)
        rows
      end

      # Selectable Rows No Subrows - checkboxes in their own first cell
      def render_select_all_header
        if selectable_rows
          additional_classes = []
          additional_classes << "table-header-cells-custom"
          additional_classes << "header-cells-with-actions" if show_actions_bar
          additional_classes << "checkbox-cell-header"
          additional_classes << "pinned-left" if responsive == "scroll"
          pb_rails("table/table_header", props: {
                     classname: additional_classes.join(" "),
                   }) do
            pb_rails("checkbox", props: {
                       id: "#{table_id ? "#{table_id}-" : ''}select-all-rows",
                       indeterminate_main: true,
                       indeterminate_main_labels: ["", ""],
                       name: "#{table_id ? "#{table_id}-" : ''}select-all-rows",
                     })
          end
        end
      end

      # Selectable Rows w/ Subrows - checkboxes part of toggleable first cell
      def render_select_all_checkbox
        if selectable_rows
          pb_rails("checkbox", props: {
                     id: "#{table_id ? "#{table_id}-" : ''}select-all-rows",
                     indeterminate_main: true,
                     indeterminate_main_labels: ["", ""],
                     name: "#{table_id ? "#{table_id}-" : ''}select-all-rows",
                     data: {
                       action: "click->pb-advanced-table#toggleAllRowSelection",
                     },
                   })
        end
      end

      # Get original column definition for custom rendering by accessor
      def find_original_column_def(accessor)
        find_column_def_by_accessor(column_definitions, accessor)
      end

      # Get original column definition for custom rendering by id
      def find_original_column_def_by_id(id)
        find_column_def_by_id(column_definitions, id)
      end

      # Check if a header cell has a custom renderer
      def has_header_renderer?(cell)
        original_def = find_original_column_def_for_cell(cell)
        original_def&.dig(:header).present?
      rescue
        false
      end

      # Render custom header content
      def render_header(cell)
        return cell[:label] unless has_header_renderer?(cell)

        original_def = find_original_column_def_for_cell(cell)
        return cell[:label] unless original_def

        custom_renderer = original_def[:header]
        return cell[:label] unless custom_renderer

        # Call the custom renderer with the cell data and label
        begin
          result = custom_renderer.call(cell, cell[:label])
          result.present? ? result.to_s : cell[:label]
        rescue
          cell[:label]
        end
      end

      # Get header background color from column styling
      def header_background_color(cell)
        original_def = find_original_column_def_for_cell(cell)
        return nil unless original_def

        original_def.dig(:column_styling, :header_background_color)
      end

      # Get header font color from column styling
      def header_font_color(cell)
        original_def = find_original_column_def_for_cell(cell)
        return nil unless original_def

        original_def.dig(:column_styling, :header_font_color)
      end

      # Check if any row in the table has children
      def has_any_sub_rows?
        return false if table_data.blank?

        table_data.any? { |row| row_has_children?(row) }
      end

      # Determines if the toggle-all button should be shown in the header based on inline row loading and persist toggle expansion button props
      def show_toggle_all_button?
        return false unless enable_toggle_expansion == "header" || enable_toggle_expansion == "all"

        has_any_sub_rows? || (inline_row_loading && persist_toggle_expansion_button)
      end

      # Check if header has custom background color
      def has_custom_header_background_color?(cell)
        cell[:header_background_color].present?
      end

      # Returns component info for header cell (uses background kit if custom bg color)
      def header_component_info(cell, cell_index, row_index)
        header_id = cell[:accessor].present? ? cell[:accessor] : "header_#{row_index}_#{cell_index}"
        classname = [th_classname(is_first_column: cell_index.zero?), ("last-header-cell" if cell[:is_last_in_group] && cell_index != 0)].compact.join(" ")

        if has_custom_header_background_color?(cell)
          component_name = "background"
          component_props = {
            background_color: cell[:header_background_color],
            tag: "th",
            classname: classname,
          }
          component_props[:html_options] = {
            id: header_id,
            colspan: cell[:colspan],
            style: { color: cell[:header_font_color] },
          }
          component_props[:html_options][:style].delete(:color) unless cell[:header_font_color].present?
        else
          component_name = "table/table_header"
          component_props = {
            id: header_id,
            colspan: cell[:colspan],
            classname: classname,
            sort_menu: cell[:accessor] ? cell[:sort_menu] : nil,
          }
          component_props[:html_options] = { style: { color: cell[:header_font_color] } } if cell[:header_font_color].present?
        end

        { name: component_name, props: component_props }
      end

    private

      # Find the original column definition for a cell
      def find_original_column_def_for_cell(cell)
        # Try accessor first (for leaf columns)
        if cell[:accessor].present?
          found = find_original_column_def(cell[:accessor])
          return found if found
        end

        # Try id if accessor lookup didn't find it (for grouped columns or leaf columns with id)
        if cell[:id].present?
          found = find_original_column_def_by_id(cell[:id])
          return found if found
        end

        nil
      end

      def compute_max_depth(columns)
        columns.map do |col|
          col[:columns] ? 1 + compute_max_depth(col[:columns]) : 1
        end.max || 1
      end

      def process_columns(columns, rows, current_depth, max_depth)
        total_columns = columns.size
        columns.each_with_index do |col, index|
          is_last = index == total_columns - 1
          nested_columns = col[:columns]
          if nested_columns
            colspan = compute_leaf_columns(nested_columns)
            cell_hash = {
              label: col[:label],
              colspan: colspan,
              is_last_in_group: is_last && current_depth.positive?,
            }
            cell_hash[:id] = col[:id] if col[:id].present?
            rows[current_depth] << cell_hash

            process_columns(nested_columns, rows, current_depth + 1, max_depth)
          else
            raw_styling = col[:column_styling] || {}
            header_alignment = raw_styling[:header_alignment]
            header_background_color = raw_styling[:header_background_color]
            header_font_color = raw_styling[:header_font_color]

            colspan = 1
            cell_hash = {
              label: col[:label],
              colspan: colspan,
              accessor: col[:accessor],
              sort_menu: col[:sort_menu],
              is_last_in_group: is_last && current_depth.positive?,
              header_alignment: header_alignment,
              header_background_color: header_background_color,
              header_font_color: header_font_color,
            }
            cell_hash[:id] = col[:id] if col[:id].present?
            rows[current_depth] << cell_hash
          end
        end
      end

      def compute_leaf_columns(columns)
        columns.reduce(0) do |sum, col|
          col[:columns] ? sum + compute_leaf_columns(col[:columns]) : sum + 1
        end
      end

      def wrap_leaf_columns(column_definitions)
        max_depth = compute_max_depth(column_definitions)

        column_definitions.map do |col|
          if col[:columns]
            nested_columns = col[:columns]
            wrapped = {
              label: col[:label],
              columns: wrap_leaf_columns(nested_columns),
            }
            wrapped[:id] = col[:id] if col[:id].present?
            wrapped[:header] = col[:header] if col[:header].present?
            wrapped
          else
            # For leaf columns, wrap with empty labels up to max depth to get proper structure
            wrap_leaf_column(col, max_depth)
          end
        end
      end

      def wrap_leaf_column(col, max_depth)
        wrapped = {
          accessor: col[:accessor],
          label: col[:label] || "",
          sort_menu: col[:sort_menu] || nil,
          column_styling: col[:column_styling] || {},
        }
        wrapped[:id] = col[:id] if col[:id].present?
        (max_depth - 1).times do
          wrapped = { label: "", columns: [wrapped] }
        end
        wrapped
      end

      def find_column_def_by_accessor(defs, target_accessor)
        return nil if target_accessor.blank?

        defs.each do |col|
          col_accessor = col[:accessor]
          next if col_accessor.blank?

          return col if col_accessor.to_s == target_accessor.to_s

          nested_columns = col[:columns]
          if nested_columns.is_a?(Array)
            found = find_column_def_by_accessor(nested_columns, target_accessor)
            return found if found
          end
        end
        nil
      end

      def find_column_def_by_id(defs, target_id)
        return nil if target_id.blank?

        defs.each do |col|
          col_id = col[:id]

          return col if col_id.present? && col_id.to_s == target_id.to_s

          # Recursively search nested columns, even if current col has no id or doesn't match
          nested_columns = col[:columns]

          next unless nested_columns.present?

          # Convert to array if needed (for edge cases where is_a?(Array) might fail)
          array_columns = Array(nested_columns)

          if array_columns.any?
            found = find_column_def_by_id(array_columns, target_id)
            return found if found
          end
        end
        nil
      end

      # 2 inline row loading helper methods
      def row_has_children?(row)
        children = row_children_for(row)
        children.present? && children.is_a?(::Array) && !children.empty?
      end

      def row_children_for(row)
        if row.respond_to?(:children)
          row.children
        elsif row.respond_to?(:[])
          row[:children] || row["children"]
        end
      end
    end
  end
end
