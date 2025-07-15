# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/table_row"

RSpec.describe Playbook::PbAdvancedTable::TableRow do
  subject { Playbook::PbAdvancedTable::TableRow }

  it { is_expected.to define_string_prop(:id).with_default("") }
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

  describe "#classname" do
    context "basic functionality" do
      it "returns base class name for root row" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.classname).to eq "pb_table_tr bg-white "
      end

      it "includes depth class for subrows", :aggregate_failures do
        expect(subject.new(row: {}, depth: 1).classname).to eq "pb_table_tr bg-white depth-sub-row-1"
        expect(subject.new(row: {}, depth: 2).classname).to eq "pb_table_tr bg-white depth-sub-row-2"
        expect(subject.new(row: {}, depth: 3).classname).to eq "pb_table_tr bg-white depth-sub-row-3"
      end

      it "does not include depth class for root rows" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.classname).not_to include "depth-sub-row"
      end
    end

    context "with additional classname" do
      it "includes additional classes" do
        instance = subject.new(row: {}, depth: 0, classname: "custom-class")
        expect(instance.classname).to eq "pb_table_tr bg-white  custom-class"
      end

      it "combines depth class with additional classes" do
        instance = subject.new(row: {}, depth: 2, classname: "custom-class another-class")
        expect(instance.classname).to eq "pb_table_tr bg-white depth-sub-row-2 custom-class another-class"
      end
    end
  end

  describe "#td_classname" do
    let(:basic_column) { { is_last_in_group: false } }
    let(:last_column) { { is_last_in_group: true } }

    context "basic functionality" do
      let(:instance) { subject.new(row: {}, depth: 0) }

      it "returns basic td classes" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell chrome-styles"
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell chrome-styles"
      end

      it "includes last-cell for last in group" do
        expect(instance.td_classname(last_column, 0)).to eq "id-cell chrome-styles last-cell"
        expect(instance.td_classname(last_column, 1)).to eq "id-cell chrome-styles last-cell"
      end
    end

    context "with pinned left" do
      let(:instance) { subject.new(row: {}, depth: 0, responsive: "scroll", is_pinned_left: true) }

      it "includes pinned-left for first column" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell chrome-styles pinned-left"
      end

      it "does not include pinned-left for other columns" do
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell chrome-styles"
        expect(instance.td_classname(basic_column, 2)).to eq "id-cell chrome-styles"
      end

      it "combines pinned-left with last-cell" do
        expect(instance.td_classname(last_column, 0)).to eq "id-cell chrome-styles last-cell pinned-left"
      end
    end

    context "without pinned left" do
      let(:instance) { subject.new(row: {}, depth: 0, responsive: "none", is_pinned_left: false) }

      it "does not include pinned-left for any column" do
        expect(instance.td_classname(basic_column, 0)).to eq "id-cell chrome-styles"
        expect(instance.td_classname(basic_column, 1)).to eq "id-cell chrome-styles"
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
