# frozen_string_literal: true

require_relative "../../../../../app/pb_kits/playbook/pb_advanced_table/table_header"

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
end
