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
  it { is_expected.to define_hash_prop(:pinned_rows).with_default({}) }

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

  describe "pinned_rows" do
    describe "#pinned_top_ids" do
      it "returns empty array when pinned_rows is nil or empty" do
        expect(subject.new({}).pinned_top_ids).to eq []
        expect(subject.new(pinned_rows: {}).pinned_top_ids).to eq []
      end

      it "returns top ids from symbol key" do
        instance = subject.new(pinned_rows: { top: %w[row_1 row_2] })
        expect(instance.pinned_top_ids).to eq %w[row_1 row_2]
      end

      it "returns top ids from string key" do
        instance = subject.new(pinned_rows: { "top" => ["totals"] })
        expect(instance.pinned_top_ids).to eq %w[totals]
      end

      it "stringifies id values" do
        instance = subject.new(pinned_rows: { top: [123, :totals] })
        expect(instance.pinned_top_ids).to eq %w[123 totals]
      end
    end

    describe "#row_id_for" do
      let(:instance) { subject.new({}) }

      it "returns id from symbol key" do
        expect(instance.row_id_for({ id: "abc" })).to eq "abc"
      end

      it "returns id from string key" do
        expect(instance.row_id_for({ "id" => "xyz" })).to eq "xyz"
      end

      it "returns nil for nil row" do
        expect(instance.row_id_for(nil)).to be_nil
      end
    end

    describe "#find_row_by_id" do
      let(:table_data) do
        [
          { id: "a", name: "Row A" },
          { id: "b", name: "Row B", children: [{ id: "b1", name: "Child B1" }] },
        ]
      end
      let(:instance) { subject.new(table_data: table_data) }

      it "finds top-level row by id" do
        found = instance.find_row_by_id(table_data, "a")
        expect(found).to be_a(Hash)
        expect(found[:row][:id]).to eq "a"
        expect(found[:depth]).to eq 0
      end

      it "finds nested row by id" do
        found = instance.find_row_by_id(table_data, "b1")
        expect(found).to be_a(Hash)
        expect(found[:row][:id]).to eq "b1"
        expect(found[:depth]).to eq 1
      end

      it "returns nil when id not found" do
        expect(instance.find_row_by_id(table_data, "missing")).to be_nil
      end
    end

    describe "#pinned_root_rows" do
      let(:table_data) do
        [
          { id: "totals", name: "Totals" },
          { id: "row_1", name: "Row 1" },
        ]
      end

      it "returns empty array when no pinned_rows" do
        instance = subject.new(table_data: table_data)
        expect(instance.pinned_root_rows).to eq []
      end

      it "returns root info hashes for each pinned id found in table_data" do
        instance = subject.new(table_data: table_data, pinned_rows: { top: ["totals"] })
        rows = instance.pinned_root_rows
        expect(rows.length).to eq 1
        expect(rows.first[:row][:id]).to eq "totals"
        expect(rows.first[:depth]).to eq 0
      end

      it "skips ids not found in table_data" do
        instance = subject.new(table_data: table_data, pinned_rows: { top: %w[totals nonexistent] })
        rows = instance.pinned_root_rows
        expect(rows.length).to eq 1
        expect(rows.first[:row][:id]).to eq "totals"
      end
    end

    describe "#has_pinned_rows?" do
      it "returns false when no pinned rows" do
        instance = subject.new(table_data: [{ id: "1" }])
        expect(instance.has_pinned_rows?).to be false
      end

      it "returns true when pinned_root_rows is non-empty" do
        instance = subject.new(table_data: [{ id: "totals" }], pinned_rows: { top: ["totals"] })
        expect(instance.has_pinned_rows?).to be true
      end
    end

    describe "#build_pinned_row_style" do
      let(:instance) { subject.new(table_id: "t1") }

      it "returns sticky style string with index and default background" do
        style = instance.build_pinned_row_style(0)
        expect(style).to include("position: sticky")
        expect(style).to include("var(--advanced-table-header-height, 44px)")
        expect(style).to include("2.5em * 0")
        expect(style).to include("z-index: 3")
        expect(style).to include("background: white")
      end

      it "uses custom background when given" do
        style = instance.build_pinned_row_style(1, background: "#f0f0f0")
        expect(style).to include("background: #f0f0f0")
        expect(style).to include("2.5em * 1")
      end
    end
  end
end
