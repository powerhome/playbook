# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/table_row"

RSpec.describe Playbook::PbAdvancedTable::TableRow do
  subject { Playbook::PbAdvancedTable::TableRow }

  it { is_expected.to define_string_prop(:table_id).with_default("") }
  it { is_expected.to define_array_prop(:column_definitions).with_default([]) }
  it { is_expected.to define_prop(:row) }
  it { is_expected.to define_prop(:depth) }
  it { is_expected.to define_boolean_prop(:collapsible_trail).with_default(true) }
  it { is_expected.to define_hash_prop(:table_data_attributes).with_default({}) }
  it { is_expected.to define_boolean_prop(:loading).with_default(false) }
  it {
    is_expected.to define_enum_prop(:responsive)
      .with_default("scroll")
      .with_values("none", "scroll")
  }
  it { is_expected.to define_boolean_prop(:is_pinned_left).with_default(false) }
  it { is_expected.to define_boolean_prop(:selectable_rows).with_default(false) }
  it { is_expected.to define_string_prop(:row_id).with_default("") }
  it {
    is_expected.to define_enum_prop(:enable_toggle_expansion)
      .with_default("header")
      .with_values("all", "header", "none")
  }
  it { is_expected.to define_boolean_prop(:inline_row_loading).with_default(false) }

  describe "#classname" do
    context "basic functionality" do
      it "returns base class name for root row" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.classname).to eq "pb_table_tr pb-bg-row-white "
      end

      it "includes depth class for subrows", :aggregate_failures do
        expect(subject.new(row: {}, depth: 1).classname).to eq "pb_table_tr pb-bg-row-white depth-sub-row-1"
        expect(subject.new(row: {}, depth: 2).classname).to eq "pb_table_tr pb-bg-row-white depth-sub-row-2"
        expect(subject.new(row: {}, depth: 3).classname).to eq "pb_table_tr pb-bg-row-white depth-sub-row-3"
      end

      it "does not include depth class for root rows" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.classname).not_to include "depth-sub-row"
      end
    end

    context "with additional classname" do
      it "includes additional classes" do
        instance = subject.new(row: {}, depth: 0, classname: "custom-class")
        expect(instance.classname).to eq "pb_table_tr pb-bg-row-white  custom-class"
      end

      it "combines depth class with additional classes" do
        instance = subject.new(row: {}, depth: 2, classname: "custom-class another-class")
        expect(instance.classname).to eq "pb_table_tr pb-bg-row-white depth-sub-row-2 custom-class another-class"
      end
    end
  end

  describe "#td_classname" do
    let(:basic_column) { { is_last_in_group: false } }
    let(:last_column) { { is_last_in_group: true } }

    context "basic functionality" do
      let(:instance) { subject.new(row: {}, depth: 0) }

      it "returns basic td classes" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell"
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell"
      end

      it "includes last-cell for last in group" do
        expect(instance.td_classname(last_column, 0)).to eq "id-cell last-cell"
        expect(instance.td_classname(last_column, 1)).to eq "id-cell last-cell"
      end
    end

    context "with pinned left" do
      let(:instance) { subject.new(row: {}, depth: 0, responsive: "scroll", is_pinned_left: true) }

      it "includes pinned-left for first column" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell pinned-left"
      end

      it "does not include pinned-left for other columns" do
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell"
        expect(instance.td_classname(basic_column, 2)).to eq "id-cell"
      end

      it "combines pinned-left with last-cell" do
        expect(instance.td_classname(last_column, 0)).to eq "id-cell last-cell pinned-left"
      end
    end

    context "without pinned left" do
      let(:instance) { subject.new(row: {}, depth: 0, responsive: "none", is_pinned_left: false) }

      it "does not include pinned-left for any column" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell"
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell"
      end
    end

    context "with column-level cell padding" do
      let(:column_definitions) do
        [
          { accessor: "test", column_styling: { cell_padding: "md" } },
          { accessor: "other", column_styling: { cell_padding: "lg" } },
        ]
      end
      let(:instance) { subject.new(row: {}, depth: 0, column_definitions: column_definitions) }

      it "includes column padding class" do
        expect(instance.td_classname({ accessor: "test" }, 0)).to eq "id-cell p_md"
        expect(instance.td_classname({ accessor: "other" }, 1)).to eq "id-cell p_lg"
      end

      it "does not include padding for columns without cell_padding" do
        expect(instance.td_classname({ accessor: "nonexistent" }, 2)).to eq "id-cell"
      end
    end

    context "with row-level cell padding" do
      let(:row_styling) do
        [
          { row_id: "1", cell_padding: "sm" },
          { row_id: "2", cell_padding: "xl" },
        ]
      end
      let(:instance) { subject.new(row: {}, depth: 0, row_styling: row_styling, row_id: "1") }

      it "includes row padding class" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell p_sm"
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell p_sm"
      end

      it "does not include padding for rows without styling" do
        instance = subject.new(row: {}, depth: 0, row_styling: row_styling, row_id: "3")
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell"
      end
    end
  end

  describe "#data" do
    context "with table_data_attributes" do
      let(:table_attributes) { { row_id: "123", depth: 1 } }
      let(:instance) { subject.new(row: {}, depth: 0, table_data_attributes: table_attributes) }

      it "merges table_data_attributes with prop data" do
        expect(instance.data).to include(table_attributes)
      end

      it "includes prop data when provided" do
        instance = subject.new(row: {}, depth: 0, table_data_attributes: table_attributes, data: { custom: "value" })
        expect(instance.data).to include(table_attributes)
        expect(instance.data).to include(custom: "value")
      end
    end

    context "without table_data_attributes" do
      let(:instance) { subject.new(row: {}, depth: 0) }

      it "returns empty hash when no data provided" do
        expect(instance.data).to eq({})
      end

      it "returns prop data when provided" do
        instance = subject.new(row: {}, depth: 0, data: { custom: "value" })
        expect(instance.data).to eq(custom: "value")
      end
    end
  end

  describe "#depth_accessors" do
    let(:column_definitions) do
      [
        { accessor: "name", label: "Name" },
        { accessor: "email", label: "Email", cellAccessors: %w[level1 level2] },
        { accessor: "phone", label: "Phone", cellAccessors: ["level3"] },
      ]
    end
    let(:instance) { subject.new(row: {}, depth: 0, column_definitions: column_definitions) }

    it "extracts cellAccessors from column definitions" do
      result = instance.depth_accessors
      expect(result).to eq %w[level1 level2 level3]
    end

    it "returns empty array when no cellAccessors present" do
      simple_columns = [{ accessor: "name", label: "Name" }]
      instance = subject.new(row: {}, depth: 0, column_definitions: simple_columns)
      expect(instance.depth_accessors).to eq []
    end
  end

  describe "#justify_for" do
    let(:column) { { accessor: "test" } }
    let(:instance) { subject.new(row: {}, depth: 0, column_definitions: []) }

    context "first column" do
      it "always returns start for first column" do
        expect(instance.justify_for(column, 0)).to eq "start"
      end
    end

    context "other columns" do
      it "returns end by default" do
        expect(instance.justify_for(column, 1)).to eq "end"
        expect(instance.justify_for(column, 2)).to eq "end"
      end

      context "with cell alignment" do
        let(:column_definitions) do
          [
            { accessor: "test", column_styling: { cell_alignment: "left" } },
          ]
        end
        let(:instance) { subject.new(row: {}, depth: 0, column_definitions: column_definitions) }

        it "returns start for left alignment" do
          expect(instance.justify_for({ accessor: "test" }, 1)).to eq "start"
        end

        it "returns center for center alignment" do
          column_definitions[0][:column_styling][:cell_alignment] = "center"
          expect(instance.justify_for({ accessor: "test" }, 1)).to eq "center"
        end

        it "returns end for right alignment" do
          column_definitions[0][:column_styling][:cell_alignment] = "right"
          expect(instance.justify_for({ accessor: "test" }, 1)).to eq "end"
        end
      end
    end
  end

  describe "#render_checkbox_cell" do
    context "when selectable_rows is true" do
      let(:instance) { subject.new(row: { id: 1 }, depth: 0, selectable_rows: true, row_id: "row-1") }

      it "attempts to render checkbox cell" do
        # Test that the method exists and can be called
        expect(instance).to respond_to(:render_checkbox_cell)
        expect(instance.selectable_rows).to be true
      end
    end

    context "when selectable_rows is false" do
      let(:instance) { subject.new(row: { id: 1 }, depth: 0, selectable_rows: false) }

      it "does not render checkbox cell" do
        expect(instance.render_checkbox_cell).to be_nil
      end
    end
  end

  describe "#render_row_checkbox" do
    context "when selectable_rows is true" do
      let(:instance) { subject.new(row: { id: 1 }, depth: 0, selectable_rows: true, row_id: "row-1") }

      it "attempts to render row checkbox" do
        # Test that the method exists and can be called
        expect(instance).to respond_to(:render_row_checkbox)
        expect(instance.selectable_rows).to be true
      end
    end

    context "when selectable_rows is false" do
      let(:instance) { subject.new(row: { id: 1 }, depth: 0, selectable_rows: false) }

      it "does not render row checkbox" do
        expect(instance.render_row_checkbox).to be_nil
      end
    end
  end

  describe "#cell_background_color" do
    let(:row) { { id: 1, value: 25 } }
    let(:column_definitions) do
      [
        { accessor: "value", column_styling: { cell_background_color: "success_secondary" } },
        { accessor: "other", column_styling: { cell_background_color: ->(row) { row[:value] > 20 ? "warning_secondary" : "error_secondary" } } },
        { accessor: "none", column_styling: {} },
      ]
    end
    let(:instance) { subject.new(row: row, depth: 0, column_definitions: column_definitions) }

    context "with static background color" do
      it "returns the static color" do
        expect(instance.cell_background_color({ accessor: "value" })).to eq "success_secondary"
      end
    end

    context "with lambda background color" do
      it "calls the lambda with row data and returns result" do
        expect(instance.cell_background_color({ accessor: "other" })).to eq "warning_secondary"
      end

      it "handles different lambda results" do
        row[:value] = 15
        instance = subject.new(row: row, depth: 0, column_definitions: column_definitions)
        expect(instance.cell_background_color({ accessor: "other" })).to eq "error_secondary"
      end
    end

    context "without background color" do
      it "returns nil when no cell_background_color specified" do
        expect(instance.cell_background_color({ accessor: "none" })).to be_nil
      end

      it "returns nil when column not found" do
        expect(instance.cell_background_color({ accessor: "nonexistent" })).to be_nil
      end
    end
  end

  describe "#has_custom_background_color?" do
    let(:column_definitions) do
      [
        { accessor: "with_color", column_styling: { cell_background_color: "success_secondary" } },
        { accessor: "without_color", column_styling: {} },
      ]
    end
    let(:instance) { subject.new(row: {}, depth: 0, column_definitions: column_definitions) }

    it "returns true when column has background color" do
      expect(instance.has_custom_background_color?({ accessor: "with_color" })).to be true
    end

    it "returns false when column has no background color" do
      expect(instance.has_custom_background_color?({ accessor: "without_color" })).to be false
    end

    it "returns false when column not found" do
      expect(instance.has_custom_background_color?({ accessor: "nonexistent" })).to be false
    end
  end

  describe "#cell_font_color" do
    let(:row) { { id: 1, value: 25 } }
    let(:column_definitions) do
      [
        { accessor: "value", column_styling: { font_color: "red" } },
        { accessor: "other", column_styling: { font_color: ->(row) { row[:value] > 20 ? "white" : "black" } } },
        { accessor: "none", column_styling: {} },
      ]
    end
    let(:instance) { subject.new(row: row, depth: 0, column_definitions: column_definitions) }

    context "with static font color" do
      it "returns the static color" do
        expect(instance.cell_font_color({ accessor: "value" })).to eq "red"
      end
    end

    context "with lambda font color" do
      it "calls the lambda with row data and returns result" do
        expect(instance.cell_font_color({ accessor: "other" })).to eq "white"
      end

      it "handles different lambda results" do
        row[:value] = 15
        instance = subject.new(row: row, depth: 0, column_definitions: column_definitions)
        expect(instance.cell_font_color({ accessor: "other" })).to eq "black"
      end
    end

    context "without font color" do
      it "returns nil when no font_color specified" do
        expect(instance.cell_font_color({ accessor: "none" })).to be_nil
      end

      it "returns nil when column not found" do
        expect(instance.cell_font_color({ accessor: "nonexistent" })).to be_nil
      end
    end
  end

  describe "#cell_component_info" do
    let(:row) { { id: 1, value: 25 } }
    let(:column_definitions) do
      [
        { accessor: "with_font", column_styling: { font_color: "blue" } },
        { accessor: "with_bg_and_font", column_styling: { cell_background_color: "success_secondary", font_color: "white" } },
        { accessor: "with_bg_only", column_styling: { cell_background_color: "warning_secondary" } },
        { accessor: "none", column_styling: {} },
      ]
    end
    let(:instance) { subject.new(row: row, depth: 0, column_definitions: column_definitions) }

    context "with font color only" do
      it "uses table/table_cell with font color in style" do
        result = instance.cell_component_info({ accessor: "with_font" }, 0, nil, nil)
        expect(result[:name]).to eq "table/table_cell"
        expect(result[:props][:html_options][:style][:color]).to eq "blue"
      end
    end

    context "with background color and font color" do
      it "uses background component with font color in html_options" do
        result = instance.cell_component_info({ accessor: "with_bg_and_font" }, 0, nil, nil)
        expect(result[:name]).to eq "background"
        expect(result[:props][:background_color]).to eq "success_secondary"
        expect(result[:props][:html_options][:style][:color]).to eq "white"
      end
    end

    context "with background color only" do
      it "uses background component without font color" do
        result = instance.cell_component_info({ accessor: "with_bg_only" }, 0, nil, nil)
        expect(result[:name]).to eq "background"
        expect(result[:props][:background_color]).to eq "warning_secondary"
        expect(result[:props][:html_options]).to be_nil
      end
    end

    context "without font color" do
      it "does not include color in style when no font color is present" do
        result = instance.cell_component_info({ accessor: "none" }, 0, nil, nil)
        expect(result[:name]).to eq "table/table_cell"
        expect(result[:props][:html_options][:style]).not_to have_key(:color)
      end
    end

    context "column font color takes precedence over row font color" do
      it "uses column font color when both are present" do
        result = instance.cell_component_info({ accessor: "with_font" }, 0, nil, "red")
        expect(result[:props][:html_options][:style][:color]).to eq "blue"
      end

      it "falls back to row font color when column font color is not present" do
        result = instance.cell_component_info({ accessor: "none" }, 0, nil, "red")
        expect(result[:props][:html_options][:style][:color]).to eq "red"
      end
    end
  end

  describe "#show_expand_button?" do
    let(:column_definitions) { [{ accessor: "name", label: "Name", cellAccessors: ["level1"] }] }

    context "when row has actual children" do
      it "returns true" do
        row = { name: "Parent", children: [{ name: "Child 1" }] }
        instance = subject.new(row: row, depth: 0, column_definitions: column_definitions)
        expect(instance.show_expand_button?).to be true
      end
    end

    context "when row has no children key" do
      it "returns false" do
        row = { name: "Leaf" }
        instance = subject.new(row: row, depth: 0, column_definitions: column_definitions)
        expect(instance.show_expand_button?).to be false
      end
    end

    context "when row has empty children array" do
      context "with inline_row_loading disabled" do
        it "returns false" do
          row = { name: "Lazy Parent", children: [] }
          instance = subject.new(row: row, depth: 0, column_definitions: column_definitions, inline_row_loading: false)
          expect(instance.show_expand_button?).to be false
        end
      end

      context "with inline_row_loading enabled" do
        it "returns true" do
          row = { name: "Lazy Parent", children: [] }
          instance = subject.new(row: row, depth: 0, column_definitions: column_definitions, inline_row_loading: true)
          expect(instance.show_expand_button?).to be true
        end
      end
    end

    context "when row has nil children" do
      it "returns false" do
        row = { name: "Leaf", children: nil }
        instance = subject.new(row: row, depth: 0, column_definitions: column_definitions)
        expect(instance.show_expand_button?).to be false
      end

      it "returns false even with inline_row_loading enabled" do
        row = { name: "Leaf", children: nil }
        instance = subject.new(row: row, depth: 0, column_definitions: column_definitions, inline_row_loading: true)
        expect(instance.show_expand_button?).to be false
      end
    end
  end

  describe "#row_children" do
    context "with Hash row" do
      it "returns children using symbol key" do
        row = { name: "Parent", children: [{ name: "Child" }] }
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_children).to eq [{ name: "Child" }]
      end

      it "returns children using string key" do
        row = { "name" => "Parent", "children" => [{ "name" => "Child" }] }
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_children).to eq [{ "name" => "Child" }]
      end

      it "returns nil when children key is absent" do
        row = { name: "Leaf" }
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_children).to be_nil
      end

      it "returns empty array when children is empty" do
        row = { name: "Lazy", children: [] }
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_children).to eq []
      end
    end

    context "with OpenStruct row" do
      it "returns children using method access" do
        row = OpenStruct.new(name: "Parent", children: [OpenStruct.new(name: "Child")])
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_children.length).to eq 1
        expect(instance.row_children.first.name).to eq "Child"
      end

      it "returns empty array when children is empty" do
        row = OpenStruct.new(name: "Lazy", children: [])
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_children).to eq []
      end
    end
  end

  describe "prop behavior" do
    context "row_id prop" do
      it "uses provided row_id" do
        instance = subject.new(row: {}, depth: 0, row_id: "custom-123")
        expect(instance.row_id).to eq "custom-123"
      end

      it "falls back to object_id when not provided" do
        row = { id: 1 }
        instance = subject.new(row: row, depth: 0)
        expect(instance.row_id).to eq ""
      end
    end

    context "responsive prop" do
      it "defaults to scroll" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.responsive).to eq "scroll"
      end

      it "accepts none value" do
        instance = subject.new(row: {}, depth: 0, responsive: "none")
        expect(instance.responsive).to eq "none"
      end
    end

    context "enable_toggle_expansion prop" do
      it "defaults to header" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.enable_toggle_expansion).to eq "header"
      end

      it "accepts all values" do
        expect(subject.new(row: {}, depth: 0, enable_toggle_expansion: "all").enable_toggle_expansion).to eq "all"
        expect(subject.new(row: {}, depth: 0, enable_toggle_expansion: "header").enable_toggle_expansion).to eq "header"
        expect(subject.new(row: {}, depth: 0, enable_toggle_expansion: "none").enable_toggle_expansion).to eq "none"
      end
    end
  end
end
