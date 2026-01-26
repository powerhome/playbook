# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/table_body"

RSpec.describe Playbook::PbAdvancedTable::TableBody do
  subject { Playbook::PbAdvancedTable::TableBody }

  it { is_expected.to define_string_prop(:table_id).with_default("") }
  it { is_expected.to define_array_prop(:table_data).with_default([]) }
  it { is_expected.to define_array_prop(:column_definitions).with_default([]) }
  it {
    is_expected.to define_enum_prop(:enable_toggle_expansion)
      .with_default("header")
      .with_values("all", "header", "none")
  }
  it { is_expected.to define_array_prop(:subrow_headers).with_default([]) }
  it { is_expected.to define_boolean_prop(:collapsible_trail).with_default(true) }
  it { is_expected.to define_boolean_prop(:loading).with_default(false) }
  it {
    is_expected.to define_enum_prop(:responsive)
      .with_default("scroll")
      .with_values("none", "scroll")
  }
  it { is_expected.to define_boolean_prop(:selectable_rows).with_default(false) }
  it { is_expected.to define_boolean_prop(:inline_row_loading).with_default(false) }

  describe "#classname" do
    it "returns base class name" do
      expect(subject.new({}).classname).to eq "pb_advanced_table_body advanced-table-responsive-scroll pinned-left"
    end

    context "responsive prop" do
      it "adds correct responsive classes", :aggregate_failures do
        expect(subject.new(responsive: "scroll").classname).to include "advanced-table-responsive-scroll"
        expect(subject.new(responsive: "scroll").classname).to include "pinned-left"
        expect(subject.new(responsive: "none").classname).to eq "pb_advanced_table_body"
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

        expect(combined_classname).to include "pb_advanced_table_body"
        expect(combined_classname).to include "advanced-table-responsive-scroll"
        expect(combined_classname).to include "pinned-left"
        expect(combined_classname).to include "selectable-rows-enabled"
      end
    end
  end

  describe "#flatten_columns" do
    let(:simple_columns) do
      [
        { accessor: "col1", label: "Column 1" },
        { accessor: "col2", label: "Column 2" },
      ]
    end

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

    let(:deeply_nested_columns) do
      [
        {
          label: "Group 1",
          columns: [
            {
              label: "Sub Group 1",
              columns: [
                { accessor: "col1", label: "Column 1" },
              ],
            },
            { accessor: "col2", label: "Column 2" },
          ],
        },
      ]
    end

    it "returns simple columns unchanged" do
      instance = subject.new({})
      result = instance.flatten_columns(simple_columns)
      expect(result.map { |col| col[:accessor] }).to eq %w[col1 col2]
    end

    it "flattens nested column structure" do
      instance = subject.new({})
      result = instance.flatten_columns(nested_columns)
      expect(result.map { |col| col[:accessor] }).to eq %w[col1 col2 col3]
    end

    it "handles deeply nested structures" do
      instance = subject.new({})
      result = instance.flatten_columns(deeply_nested_columns)
      expect(result.map { |col| col[:accessor] }).to eq %w[col1 col2]
    end

    it "processes grouped headers correctly" do
      instance = subject.new({})
      result = instance.flatten_columns(nested_columns)

      expect(result).to be_an(Array)
      expect(result.length).to eq 3
      expect(result.all? { |col| col.key?(:accessor) && col[:accessor].present? }).to be true
    end

    it "filters out columns without accessor" do
      columns_without_accessor = [
        { label: "Group 1" },
        { accessor: "col1", label: "Column 1" },
      ]
      instance = subject.new({})
      result = instance.flatten_columns(columns_without_accessor)
      expect(result.length).to eq 1
      expect(result.first[:accessor]).to eq "col1"
    end
  end

  describe "#pinned_cell_class" do
    context "with scroll responsive" do
      let(:instance) { subject.new(responsive: "scroll") }

      it "returns pinned-left for first column" do
        expect(instance.pinned_cell_class(0)).to eq "pinned-left"
      end

      it "returns empty string for other columns" do
        expect(instance.pinned_cell_class(1)).to eq ""
        expect(instance.pinned_cell_class(2)).to eq ""
      end
    end

    context "with none responsive" do
      let(:instance) { subject.new(responsive: "none") }

      it "returns empty string for all columns" do
        expect(instance.pinned_cell_class(0)).to eq ""
        expect(instance.pinned_cell_class(1)).to eq ""
      end
    end
  end

  describe "#render_row_and_children" do
    let(:instance) { subject.new(id: "test_table") }
    let(:simple_row) { { id: 1, name: "Test Row" } }
    let(:row_with_children) do
      {
        id: 1,
        name: "Parent Row",
        children: [
          { id: 2, name: "Child Row 1" },
          { id: 3, name: "Child Row 2" },
        ],
      }
    end
    let(:column_definitions) do
      [
        { accessor: "id", label: "ID" },
        { accessor: "name", label: "Name" },
      ]
    end

    it "responds to render_row_and_children method" do
      expect(instance).to respond_to(:render_row_and_children)
    end

    it "accepts method parameters" do
      method = instance.method(:render_row_and_children)
      expect(method).to be_a(Method)

      expect(method.arity).to be_negative
    end

    it "handles simple row data structure" do
      expect(simple_row).to have_key(:id)
      expect(simple_row).to have_key(:name)
      expect(simple_row[:children]).to be_nil
    end

    it "handles nested row data structure" do
      expect(row_with_children).to have_key(:children)
      expect(row_with_children[:children]).to be_an(Array)
      expect(row_with_children[:children].length).to eq 2
    end
  end

  describe "#row_children_for" do
    let(:instance) { subject.new({}) }

    context "with Hash row" do
      it "returns children using symbol key" do
        row = { name: "Parent", children: [{ name: "Child" }] }
        expect(instance.row_children_for(row)).to eq [{ name: "Child" }]
      end

      it "returns children using string key" do
        row = { "name" => "Parent", "children" => [{ "name" => "Child" }] }
        expect(instance.row_children_for(row)).to eq [{ "name" => "Child" }]
      end

      it "returns nil when children key is absent" do
        row = { name: "Leaf" }
        expect(instance.row_children_for(row)).to be_nil
      end

      it "returns empty array when children is empty" do
        row = { name: "Lazy", children: [] }
        expect(instance.row_children_for(row)).to eq []
      end
    end

    context "with OpenStruct row" do
      it "returns children using method access" do
        row = OpenStruct.new(name: "Parent", children: [OpenStruct.new(name: "Child")])
        expect(instance.row_children_for(row).length).to eq 1
      end

      it "returns empty array when children is empty" do
        row = OpenStruct.new(name: "Lazy", children: [])
        expect(instance.row_children_for(row)).to eq []
      end
    end
  end

  describe "#cell_accessors_length" do
    let(:instance) { subject.new({}) }

    context "with Hash column definitions" do
      it "returns length of cellAccessors using symbol key" do
        col_defs = [{ accessor: "name", cellAccessors: %w[level1 level2] }]
        expect(instance.cell_accessors_length(col_defs)).to eq 2
      end

      it "returns length of cellAccessors using string key" do
        col_defs = [{ "accessor" => "name", "cellAccessors" => %w[level1 level2 level3] }]
        expect(instance.cell_accessors_length(col_defs)).to eq 3
      end

      it "returns 0 when cellAccessors is absent" do
        col_defs = [{ accessor: "name" }]
        expect(instance.cell_accessors_length(col_defs)).to eq 0
      end

      it "returns 0 when column_definitions is empty" do
        expect(instance.cell_accessors_length([])).to eq 0
      end
    end

    context "with OpenStruct column definitions" do
      it "returns length of cellAccessors using method access" do
        col_defs = [OpenStruct.new(accessor: "name", cellAccessors: %w[level1 level2])]
        expect(instance.cell_accessors_length(col_defs)).to eq 2
      end
    end
  end

  describe "#render_inline_loading_row" do
    let(:instance) { subject.new({}) }

    it "responds to method" do
      expect(instance).to respond_to(:render_inline_loading_row)
    end

    it "accepts correct parameters" do
      method = instance.method(:render_inline_loading_row)
      expect(method.arity).to eq 3
    end
  end
end
