# frozen_string_literal: true

module Playbook
  module PbAdvancedTable
    class TableBody < Playbook::KitBase
      prop :table_id, type: Playbook::Props::String,
                      default: ""
      prop :table_data, type: Playbook::Props::Array,
                        default: []
      prop :column_definitions, type: Playbook::Props::Array,
                                default: []
      prop :enable_toggle_expansion, type: Playbook::Props::Enum,
                                     values: %w[all header none],
                                     default: "header"
      prop :subrow_headers, type: Playbook::Props::Array,
                            default: []
      prop :collapsible_trail, type: Playbook::Props::Boolean,
                               default: true
      prop :loading, type: Playbook::Props::Boolean,
                     default: false
      prop :responsive, type: Playbook::Props::Enum,
                        values: %w[none scroll],
                        default: "scroll"
      prop :selectable_rows, type: Playbook::Props::Boolean,
                             default: false
      prop :row_styling, type: Playbook::Props::Array,
                         default: []
      prop :inline_row_loading, type: Playbook::Props::Boolean,
                                default: false
      prop :pinned_rows, type: Playbook::Props::HashProp,
                         default: {}

      def flatten_columns(columns)
        columns.flat_map do |col|
          if col[:columns]
            flatten_columns(col[:columns])
          elsif col[:accessor].present?
            if has_grouped_headers?
              col.merge(is_last_in_group: last_in_group?(columns, col))
            else
              col
            end
          end
        end.compact
      end

      def render_row_and_children(row, column_definitions, current_depth, first_parent_child, ancestor_ids = [], top_parent_id = nil, additional_classes: "", table_data_attributes: {}, immediate_parent_row_id: nil, is_pinned_row: false, pinned_index: nil, skip_pinned_ids: nil, initial_table_data_attributes: nil)
        if skip_pinned_ids && row_id_for(row) && skip_pinned_ids.include?(row_id_for(row).to_s)
          return is_pinned_row ? [ActiveSupport::SafeBuffer.new, pinned_index] : ActiveSupport::SafeBuffer.new
        end

        top_parent_id ||= row.object_id
        new_ancestor_ids = ancestor_ids + [row.object_id]
        leaf_columns = flatten_columns(column_definitions || [])

        output = ActiveSupport::SafeBuffer.new
        subrow_headers_arr = subrow_headers || []
        is_first_child_of_subrow = current_depth.positive? && first_parent_child && subrow_headers_arr[current_depth - 1].present?
        last_row = subrow_headers_arr.length == current_depth

        next_pinned_index = pinned_index

        subrow_ancestor_ids = ancestor_ids + ["#{row.object_id}sr"]
        subrow_data_attributes = {
          advanced_table_content: subrow_ancestor_ids.join("-"),
          row_depth: current_depth,
          row_parent: "#{table_id}_#{ancestor_ids.last}",
        }
        # Subrow header if applicable
        if is_first_child_of_subrow && enable_toggle_expansion == "all"
          subrow_props = { row: row, column_definitions: leaf_columns, depth: current_depth, subrow_header: subrow_headers_arr[current_depth - 1], collapsible_trail: collapsible_trail, classname: "toggle-content", responsive: responsive, subrow_data_attributes: subrow_data_attributes, last_row: last_row, immediate_parent_row_id: immediate_parent_row_id }
          if is_pinned_row && next_pinned_index
            subrow_props[:is_pinned_row] = true
            subrow_props[:pinned_index] = next_pinned_index
            subrow_props[:html_options] = { style: build_pinned_row_style(next_pinned_index, background: "var(--pb_table_sticky_bg, #f5f5f5)") }
            next_pinned_index += 1
          end
          output << pb_rails("advanced_table/table_subrow_header", props: subrow_props)
        end

        current_data_attributes = if current_depth.zero?
                                    {
                                      row_depth: 0,
                                      advanced_table_content: row.object_id.to_s,
                                      row_parent: nil,
                                    }
                                  else
                                    initial_table_data_attributes || table_data_attributes
                                  end

        # Additional class and data attributes needed for toggle logic
        row_props = { table_id: table_id, row: row, column_definitions: leaf_columns, depth: current_depth, collapsible_trail: collapsible_trail, classname: additional_classes, table_data_attributes: current_data_attributes, responsive: responsive, loading: loading, selectable_rows: selectable_rows, row_id: row[:id], enable_toggle_expansion: enable_toggle_expansion, row_styling: row_styling, last_row: last_row, immediate_parent_row_id: immediate_parent_row_id, inline_row_loading: inline_row_loading }
        if is_pinned_row && next_pinned_index
          row_props[:is_pinned_row] = true
          row_props[:pinned_index] = next_pinned_index
          row_bg = (row_styling || []).find { |s| s[:row_id].to_s == row_id_for(row).to_s }&.[](:background_color) || "white"
          row_props[:html_options] = { style: build_pinned_row_style(next_pinned_index, background: row_bg) }
          next_pinned_index += 1
        end
        output << pb_rails("advanced_table/table_row", props: row_props)

        # Render inline loading row when inline_row_loading is enabled and row has empty children
        if inline_row_loading
          children = row_children_for(row)
          if children.is_a?(::Array) && children.empty?
            max_depth = cell_accessors_length(column_definitions)
            if current_depth < max_depth
              loading_row_data_attributes = {
                advanced_table_content: "#{new_ancestor_ids.join('-')}-loading",
                row_depth: current_depth + 1,
                row_parent: "#{table_id}_#{row.object_id}",
                inline_loading_row: true,
              }
              output << render_inline_loading_row(leaf_columns.length, current_depth, loading_row_data_attributes)
            end
          end
        end

        if row[:children].present?
          row[:children].each do |child_row|
            is_first_child = row[:children].first == child_row
            immediate_parent_id = row.object_id
            data_content = new_ancestor_ids.join("-") + "-#{child_row.object_id}"

            child_data_attributes = {
              top_parent: "#{table_id}_#{top_parent_id}",
              row_depth: current_depth + 1,
              row_parent: "#{table_id}_#{immediate_parent_id}",
              advanced_table_content: data_content,
            }

            child_opts = { additional_classes: "toggle-content", table_data_attributes: child_data_attributes, immediate_parent_row_id: row[:id] }
            child_opts[:is_pinned_row] = is_pinned_row
            child_opts[:pinned_index] = next_pinned_index if is_pinned_row
            child_opts[:skip_pinned_ids] = skip_pinned_ids if skip_pinned_ids

            child_output, next_pinned_index = render_row_and_children(child_row, column_definitions, current_depth + 1, is_first_child, new_ancestor_ids, top_parent_id, **child_opts)
            output << child_output
          end
        end

        if is_pinned_row
          [output, next_pinned_index]
        else
          output
        end
      end

      def classname
        additional_classes = []
        additional_classes << "advanced-table-responsive-#{responsive} pinned-left" if responsive == "scroll"
        additional_classes << "selectable-rows-enabled" if selectable_rows && enable_toggle_expansion == "none"
        generate_classname("pb_advanced_table_body", *additional_classes, separator: " ")
      end

      def pinned_cell_class(index)
        return "pinned-left" if index.zero? && responsive == "scroll"

        ""
      end

      # 3 helper methods for inline row loading
      def render_inline_loading_row(column_count, depth, data_attributes)
        padding_left = depth.zero? ? "0.5em" : "#{(depth + 1) * 2}em"

        content_tag(:tr, class: "toggle-content inline-loading-row", data: data_attributes) do
          content_tag(:td, colspan: column_count, style: "padding-left: #{padding_left}") do
            pb_rails("loading_inline")
          end
        end
      end

      def row_children_for(row)
        if row.respond_to?(:children)
          row.children
        elsif row.respond_to?(:[])
          row[:children] || row["children"]
        end
      end

      def row_id_for(row)
        return nil if row.nil?

        row[:id] || row["id"]
      end

      def pinned_top_ids
        return [] if pinned_rows.nil? || !pinned_rows.respond_to?(:[])

        top = pinned_rows["top"] || pinned_rows[:top]
        Array(top).map(&:to_s)
      end

      def pinned_ids_set
        return Set.new if pinned_top_ids.blank?

        set = Set.new
        pinned_root_rows.each do |root|
          collect_row_and_descendant_ids(root[:row], set)
        end
        set
      end

      def collect_row_and_descendant_ids(row, set)
        id = row_id_for(row)
        set.add(id.to_s) if id
        row_children_for(row)&.each { |child| collect_row_and_descendant_ids(child, set) }
      end

      def find_row_by_id(data, id, depth: 0, ancestor_ids: [], parent_row: nil)
        id_str = id.to_s
        Array(data).each do |row|
          return { row: row, depth: depth, ancestor_ids: ancestor_ids, parent_row: parent_row } if row_id_for(row).to_s == id_str

          found = find_row_by_id(row_children_for(row), id_str, depth: depth + 1, ancestor_ids: ancestor_ids + [row.object_id], parent_row: row)
          return found if found
        end
        nil
      end

      def pinned_root_rows
        return [] if pinned_top_ids.blank?

        pinned_top_ids.filter_map { |id| find_row_by_id(table_data, id) }
      end

      def has_pinned_rows?
        pinned_root_rows.any?
      end

      # Build inline style for sticky pinned row (matches React). Pass via html_options so the tr gets the attribute.
      def build_pinned_row_style(pinned_index, background: "white")
        header_offset = "var(--advanced-table-header-height, 44px)"
        row_offset = "calc(2.5em * #{pinned_index})"
        "position: sticky; top: calc(#{header_offset} + #{row_offset}); z-index: 3; background: #{background};"
      end

      def pinned_root_initial_data_attributes(root_info)
        return {} if root_info[:depth].to_i.zero?

        anc = root_info[:ancestor_ids] || []
        content = (anc + [root_info[:row].object_id]).join("-")
        {
          top_parent: "#{table_id}_#{anc.first}",
          row_depth: root_info[:depth],
          row_parent: "#{table_id}_#{anc.last}",
          advanced_table_content: content,
        }
      end

      def cell_accessors_length(col_defs)
        first_col = col_defs.first
        return 0 unless first_col

        accessors = if first_col.respond_to?(:cellAccessors)
                      first_col.cellAccessors
                    elsif first_col.respond_to?(:[])
                      first_col[:cellAccessors] || first_col["cellAccessors"]
                    end
        accessors&.length || 0
      end

    private

      def has_grouped_headers?
        column_definitions.any? { |col| col.key?(:columns) }
      end

      def last_in_group?(columns, current_col)
        columns.last[:accessor] == current_col[:accessor]
      end
    end
  end
end
