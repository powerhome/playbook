# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/table_header"

RSpec.describe Playbook::PbAdvancedTable::TableHeader do
  subject { Playbook::PbAdvancedTable::TableHeader }

  it { is_expected.to define_array_prop(:column_definitions).with_default([]) }
  it {
    is_expected.to define_enum_prop(:enable_toggle_expansion)
      .with_default("header")
      .with_values("all", "header", "none")
  }
  it { is_expected.to define_boolean_prop(:loading).with_default(false) }
  it {
    is_expected.to define_enum_prop(:responsive)
      .with_default("scroll")
      .with_values("none", "scroll")
  }
  it { is_expected.to define_boolean_prop(:selectable_rows).with_default(false) }
  it { is_expected.to define_boolean_prop(:show_actions_bar).with_default(true) }
  it { is_expected.to define_boolean_prop(:inline_row_loading).with_default(false) }
  it { is_expected.to define_boolean_prop(:persist_toggle_expansion_button).with_default(false) }
  it { is_expected.to define_array_prop(:table_data).with_default([]) }

  describe "#classname" do
    it "returns base class name" do
      expect(subject.new({}).classname).to eq "pb_advanced_table_header pb_table_thead advanced-table-responsive-scroll pinned-left"
    end

    context "responsive prop" do
      it "adds correct responsive classes", :aggregate_failures do
        expect(subject.new(responsive: "scroll").classname).to include "advanced-table-responsive-scroll"
        expect(subject.new(responsive: "scroll").classname).to include "pinned-left"
        expect(subject.new(responsive: "none").classname).to eq "pb_advanced_table_header pb_table_thead"
        expect(subject.new(responsive: "none").classname).not_to include "advanced-table-responsive-scroll"
        expect(subject.new(responsive: "none").classname).not_to include "pinned-left"
      end
    end

    context "selectable_rows prop" do
      it "adds selectable rows class when enabled with no toggle expansion", :aggregate_failures do
        expect(subject.new(selectable_rows: true, enable_toggle_expansion: "none").classname).to include "selectable-rows-enabled"
        expect(subject.new(selectable_rows: false, enable_toggle_expansion: "none").classname).not_to include "selectable-rows-enabled"
        expect(subject.new(selectable_rows: true, enable_toggle_expansion: "header").classname).not_to include "selectable-rows-enabled"
      end
    end

    context "combined props" do
      it "handles multiple props correctly", :aggregate_failures do
        combined_classname = subject.new(
          responsive: "scroll",
          selectable_rows: true,
          enable_toggle_expansion: "none"
        ).classname

        expect(combined_classname).to include "pb_advanced_table_header"
        expect(combined_classname).to include "pb_table_thead"
        expect(combined_classname).to include "advanced-table-responsive-scroll"
        expect(combined_classname).to include "pinned-left"
        expect(combined_classname).to include "selectable-rows-enabled"
      end
    end
  end

  describe "#th_classname" do
    context "basic functionality" do
      let(:instance) { subject.new({}) }

      it "returns base th class" do
        expect(instance.th_classname).to eq "table-header-cells"
      end

      it "adds pinned-left for first column with scroll responsive and no selectable rows" do
        instance = subject.new(responsive: "scroll", selectable_rows: false)
        expect(instance.th_classname(is_first_column: true)).to eq "table-header-cells pinned-left"
        expect(instance.th_classname(is_first_column: false)).to eq "table-header-cells"
      end

      it "does not add pinned-left when selectable_rows is true" do
        instance = subject.new(responsive: "scroll", selectable_rows: true)
        expect(instance.th_classname(is_first_column: true)).to eq "table-header-cells header-cells-with-actions"
      end
    end

    context "with selectable_rows" do
      it "adds header-cells-with-actions when selectable_rows and show_actions_bar are true", :aggregate_failures do
        instance = subject.new(selectable_rows: true, show_actions_bar: true)
        expect(instance.th_classname).to include "header-cells-with-actions"

        instance = subject.new(selectable_rows: false, show_actions_bar: true)
        expect(instance.th_classname).not_to include "header-cells-with-actions"

        instance = subject.new(selectable_rows: true, show_actions_bar: false)
        expect(instance.th_classname).not_to include "header-cells-with-actions"
      end
    end
  end

  describe "#header_rows" do
    context "simple columns" do
      let(:simple_columns) do
        [
          { accessor: "col1", label: "Column 1" },
          { accessor: "col2", label: "Column 2" },
        ]
      end

      it "processes simple columns correctly" do
        instance = subject.new(column_definitions: simple_columns)
        rows = instance.header_rows
        expect(rows).to be_an(Array)
        expect(rows.length).to be_positive
        expect(rows.first.length).to eq 2
      end
    end

    context "nested columns" do
      let(:nested_columns) do
        [
          {
            label: "Group 1",
            columns: [
              { accessor: "col1", label: "Column 1" },
              { accessor: "col2", label: "Column 2" },
            ],
          },
          { accessor: "col3", label: "Column 3" },
        ]
      end

      it "processes nested columns correctly" do
        instance = subject.new(column_definitions: nested_columns)
        rows = instance.header_rows
        expect(rows).to be_an(Array)
        expect(rows.length).to eq 2  # Should have 2 header rows for nested structure
      end

      it "sets correct colspan for grouped columns" do
        instance = subject.new(column_definitions: nested_columns)
        rows = instance.header_rows
        first_row = rows.first
        group_header = first_row.find { |cell| cell[:label] == "Group 1" }
        expect(group_header[:colspan]).to eq 2
      end

      it "marks last columns in groups" do
        instance = subject.new(column_definitions: nested_columns)
        rows = instance.header_rows
        expect(rows.flatten.any? { |cell| cell[:is_last_in_group] }).to be true
      end
    end

    context "deeply nested columns" do
      let(:deeply_nested_columns) do
        [
          {
            label: "Main Group",
            columns: [
              {
                label: "Sub Group",
                columns: [
                  { accessor: "col1", label: "Column 1" },
                ],
              },
            ],
          },
        ]
      end

      it "handles deeply nested structures" do
        instance = subject.new(column_definitions: deeply_nested_columns)
        rows = instance.header_rows
        expect(rows).to be_an(Array)
        expect(rows.length).to eq 3  # Should have 3 header rows for deeply nested structure
      end
    end

    context "mixed column types" do
      let(:mixed_columns) do
        [
          { accessor: "id", label: "ID" },
          {
            label: "Personal Info",
            columns: [
              { accessor: "first_name", label: "First Name" },
              { accessor: "last_name", label: "Last Name" },
            ],
          },
          { accessor: "email", label: "Email" },
        ]
      end

      it "handles mixed simple and grouped columns" do
        instance = subject.new(column_definitions: mixed_columns)
        rows = instance.header_rows
        expect(rows).to be_an(Array)
        expect(rows.length).to eq 2

        expect(rows.first.length).to eq 3

        expect(rows.last.length).to eq 4
      end
    end
  end

  describe "#render_select_all_header" do
    context "when selectable_rows is true" do
      let(:instance) { subject.new(selectable_rows: true) }

      it "attempts to render select all header" do
        expect(instance).to respond_to(:render_select_all_header)
        expect(instance.selectable_rows).to be true
      end
    end

    context "when selectable_rows is false" do
      let(:instance) { subject.new(selectable_rows: false) }

      it "does not render select all header" do
        expect(instance.render_select_all_header).to be_nil
      end
    end
  end

  describe "#render_select_all_checkbox" do
    context "when selectable_rows is true" do
      let(:instance) { subject.new(selectable_rows: true) }

      it "attempts to render select all checkbox" do
        expect(instance).to respond_to(:render_select_all_checkbox)
        expect(instance.selectable_rows).to be true
      end
    end

    context "when selectable_rows is false" do
      let(:instance) { subject.new(selectable_rows: false) }

      it "does not render select all checkbox" do
        expect(instance.render_select_all_checkbox).to be_nil
      end
    end
  end

  describe "#has_header_renderer?" do
    let(:custom_header_proc) { ->(_cell, label) { "Custom: #{label}" } }
    let(:column_definitions) do
      [
        { accessor: "name", label: "Name", header: custom_header_proc },
        {
          label: "Main Group",
          id: "mainGroup",
          columns: [
            {
              label: "Nested Group",
              id: "nestedGroup",
              header: custom_header_proc,
              columns: [{ accessor: "col1", label: "Column 1" }],
            },
          ],
        },
      ]
    end
    let(:instance) { subject.new(column_definitions: column_definitions) }

    it "returns true for leaf column with custom header" do
      cell = { accessor: "name", label: "Name" }
      expect(instance.has_header_renderer?(cell)).to be true
    end

    it "returns true for nested grouped column with custom header" do
      cell = { label: "Nested Group", id: "nestedGroup", colspan: 1 }
      expect(instance.has_header_renderer?(cell)).to be true
    end

    it "returns false for cell without custom header" do
      cell = { accessor: "other", label: "Other" }
      expect(instance.has_header_renderer?(cell)).to be false
    end
  end

  describe "#render_header" do
    let(:custom_header_proc) { ->(_cell, label) { "<div>#{label}</div>" } }
    let(:column_definitions) do
      [
        { accessor: "name", label: "Name", header: custom_header_proc },
        { label: "Group", id: "group1", header: custom_header_proc, columns: [{ accessor: "col1", label: "Column 1" }] },
      ]
    end
    let(:instance) { subject.new(column_definitions: column_definitions) }

    it "calls custom renderer and returns result" do
      cell = { accessor: "name", label: "Name" }
      expect(instance.render_header(cell)).to eq "<div>Name</div>"
    end

    it "returns label when no custom header exists" do
      cell = { accessor: "other", label: "Other" }
      expect(instance.render_header(cell)).to eq "Other"
    end

    it "returns label when custom renderer raises error" do
      failing_proc = ->(_cell, _label) { raise StandardError }
      instance = subject.new(column_definitions: [{ accessor: "test", label: "Test", header: failing_proc }])
      cell = { accessor: "test", label: "Test" }
      expect(instance.render_header(cell)).to eq "Test"
    end
  end

  describe "#header_background_color" do
    let(:column_definitions) do
      [
        { accessor: "name", label: "Name", column_styling: { header_background_color: "success" } },
        { accessor: "email", label: "Email", column_styling: { header_background_color: "error" } },
        { accessor: "phone", label: "Phone", column_styling: {} },
      ]
    end
    let(:instance) { subject.new(column_definitions: column_definitions) }

    it "returns header background color for leaf column" do
      cell = { accessor: "name", label: "Name" }
      expect(instance.header_background_color(cell)).to eq "success"
    end

    it "returns different background color for different columns" do
      cell = { accessor: "email", label: "Email" }
      expect(instance.header_background_color(cell)).to eq "error"
    end

    it "returns nil when no header_background_color is specified" do
      cell = { accessor: "phone", label: "Phone" }
      expect(instance.header_background_color(cell)).to be_nil
    end

    it "returns nil when column is not found" do
      cell = { accessor: "nonexistent", label: "Nonexistent" }
      expect(instance.header_background_color(cell)).to be_nil
    end
  end

  describe "#header_font_color" do
    let(:column_definitions) do
      [
        { accessor: "name", label: "Name", column_styling: { header_font_color: "white" } },
        { accessor: "email", label: "Email", column_styling: { header_font_color: "black" } },
      ]
    end
    let(:instance) { subject.new(column_definitions: column_definitions) }

    it "returns header font color for leaf column" do
      cell = { accessor: "name", label: "Name" }
      expect(instance.header_font_color(cell)).to eq "white"
    end

    it "returns different font color for different columns" do
      cell = { accessor: "email", label: "Email" }
      expect(instance.header_font_color(cell)).to eq "black"
    end

    it "returns nil when no header_font_color is specified" do
      cell = { accessor: "phone", label: "Phone" }
      expect(instance.header_font_color(cell)).to be_nil
    end

    it "returns nil when column is not found" do
      cell = { accessor: "nonexistent", label: "Nonexistent" }
      expect(instance.header_font_color(cell)).to be_nil
    end
  end

  describe "#has_custom_header_background_color?" do
    it "returns true when header_background_color is present" do
      instance = subject.new({})
      cell = { header_background_color: "success" }
      expect(instance.has_custom_header_background_color?(cell)).to be true
    end

    it "returns false when header_background_color is not present" do
      instance = subject.new({})
      cell = { label: "Test" }
      expect(instance.has_custom_header_background_color?(cell)).to be false
    end

    it "returns false when header_background_color is nil" do
      instance = subject.new({})
      cell = { header_background_color: nil }
      expect(instance.has_custom_header_background_color?(cell)).to be false
    end
  end

  describe "#header_component_info" do
    let(:column_definitions) do
      [
        { accessor: "name", label: "Name", column_styling: {} },
        { accessor: "with_bg", label: "With Background", column_styling: { header_background_color: "success" } },
        { accessor: "with_font", label: "With Font", column_styling: { header_font_color: "white" } },
        { accessor: "with_both", label: "With Both", column_styling: { header_background_color: "error", header_font_color: "white" } },
      ]
    end
    let(:instance) { subject.new(column_definitions: column_definitions) }

    context "without custom background color" do
      it "uses table/table_header component" do
        cell = { accessor: "name", label: "Name", colspan: 1, sort_menu: nil }
        result = instance.header_component_info(cell, 0, 0)
        expect(result[:name]).to eq "table/table_header"
        expect(result[:props][:classname]).to include "table-header-cells"
      end

      it "includes font color in html_options when present" do
        cell = { accessor: "with_font", label: "With Font", colspan: 1, sort_menu: nil, header_font_color: "white" }
        result = instance.header_component_info(cell, 0, 0)
        expect(result[:name]).to eq "table/table_header"
        expect(result[:props][:html_options][:style][:color]).to eq "white"
      end
    end

    context "with custom background color" do
      it "uses background component" do
        cell = { accessor: "with_bg", label: "With Background", colspan: 1, header_background_color: "success" }
        result = instance.header_component_info(cell, 0, 0)
        expect(result[:name]).to eq "background"
        expect(result[:props][:background_color]).to eq "success"
        expect(result[:props][:tag]).to eq "th"
      end

      it "includes font color in html_options when present" do
        cell = { accessor: "with_both", label: "With Both", colspan: 1, header_background_color: "error", header_font_color: "white" }
        result = instance.header_component_info(cell, 0, 0)
        expect(result[:name]).to eq "background"
        expect(result[:props][:background_color]).to eq "error"
        expect(result[:props][:html_options][:style][:color]).to eq "white"
      end

      it "does not include color in style when no font color" do
        cell = { accessor: "with_bg", label: "With Background", colspan: 1, header_background_color: "success" }
        result = instance.header_component_info(cell, 0, 0)
        expect(result[:props][:html_options][:style]).to be_empty
      end
    end

    context "with different cell positions" do
      it "adds pinned-left class for first column" do
        instance = subject.new(column_definitions: column_definitions, responsive: "scroll")
        cell = { accessor: "name", label: "Name", colspan: 1 }
        result = instance.header_component_info(cell, 0, 0)
        expect(result[:props][:classname]).to include "pinned-left"
      end

      it "does not add pinned-left for non-first columns" do
        cell = { accessor: "name", label: "Name", colspan: 1 }
        result = instance.header_component_info(cell, 1, 0)
        expect(result[:props][:classname]).not_to include "pinned-left"
      end
    end
  end

  describe "#has_any_sub_rows?" do
    context "when some rows have actual children" do
      it "returns true with Hash data" do
        table_data = [
          { name: "Team A", children: [{ name: "Member 1" }] },
          { name: "Team B" },
        ]
        instance = subject.new(table_data: table_data)
        expect(instance.has_any_sub_rows?).to be true
      end

      it "returns true with OpenStruct data" do
        table_data = [
          OpenStruct.new(name: "Team A", children: [OpenStruct.new(name: "Member 1")]),
          OpenStruct.new(name: "Team B"),
        ]
        instance = subject.new(table_data: table_data)
        expect(instance.has_any_sub_rows?).to be true
      end
    end

    context "when no rows have children" do
      it "returns false" do
        table_data = [
          { name: "Item 1" },
          { name: "Item 2" },
        ]
        instance = subject.new(table_data: table_data)
        expect(instance.has_any_sub_rows?).to be false
      end
    end

    context "when all rows have empty children arrays" do
      it "returns false" do
        table_data = [
          { name: "2021", children: [] },
          { name: "2022", children: [] },
        ]
        instance = subject.new(table_data: table_data)
        expect(instance.has_any_sub_rows?).to be false
      end
    end

    context "when rows have nil children" do
      it "returns false" do
        table_data = [
          { name: "Leaf 1", children: nil },
          { name: "Leaf 2", children: nil },
        ]
        instance = subject.new(table_data: table_data)
        expect(instance.has_any_sub_rows?).to be false
      end
    end
  end

  describe "#show_toggle_all_button?" do
    let(:column_definitions) { [{ accessor: "name", label: "Name" }] }

    context "when enable_toggle_expansion is 'none'" do
      it "returns false" do
        table_data = [{ name: "Parent", children: [{ name: "Child" }] }]
        instance = subject.new(
          table_data: table_data,
          column_definitions: column_definitions,
          enable_toggle_expansion: "none"
        )
        expect(instance.show_toggle_all_button?).to be false
      end
    end

    context "when enable_toggle_expansion is 'all'" do
      context "with actual children" do
        it "returns true" do
          table_data = [{ name: "Parent", children: [{ name: "Child" }] }]
          instance = subject.new(
            table_data: table_data,
            column_definitions: column_definitions,
            enable_toggle_expansion: "all"
          )
          expect(instance.show_toggle_all_button?).to be true
        end
      end

      context "with all empty children and inline_row_loading ON" do
        it "returns false without persist_toggle_expansion_button" do
          table_data = [
            { name: "2021", children: [] },
            { name: "2022", children: [] },
          ]
          instance = subject.new(
            table_data: table_data,
            column_definitions: column_definitions,
            enable_toggle_expansion: "all",
            inline_row_loading: true,
            persist_toggle_expansion_button: false
          )
          expect(instance.show_toggle_all_button?).to be false
        end

        it "returns true with persist_toggle_expansion_button" do
          table_data = [
            { name: "2021", children: [] },
            { name: "2022", children: [] },
          ]
          instance = subject.new(
            table_data: table_data,
            column_definitions: column_definitions,
            enable_toggle_expansion: "all",
            inline_row_loading: true,
            persist_toggle_expansion_button: true
          )
          expect(instance.show_toggle_all_button?).to be true
        end
      end

      context "with no children at all" do
        it "returns false" do
          table_data = [{ name: "Item 1" }, { name: "Item 2" }]
          instance = subject.new(
            table_data: table_data,
            column_definitions: column_definitions,
            enable_toggle_expansion: "all"
          )
          expect(instance.show_toggle_all_button?).to be false
        end
      end
    end

    context "when enable_toggle_expansion is 'header'" do
      it "returns true when rows have children" do
        table_data = [{ name: "Parent", children: [{ name: "Child" }] }]
        instance = subject.new(
          table_data: table_data,
          column_definitions: column_definitions,
          enable_toggle_expansion: "header"
        )
        expect(instance.show_toggle_all_button?).to be true
      end

      it "returns false when no rows have children" do
        table_data = [{ name: "Item 1" }, { name: "Item 2" }]
        instance = subject.new(
          table_data: table_data,
          column_definitions: column_definitions,
          enable_toggle_expansion: "header"
        )
        expect(instance.show_toggle_all_button?).to be false
      end
    end
  end
end
