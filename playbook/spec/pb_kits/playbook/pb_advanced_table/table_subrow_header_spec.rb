# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/table_subrow_header"

RSpec.describe Playbook::PbAdvancedTable::TableSubrowHeader do
  subject { Playbook::PbAdvancedTable::TableSubrowHeader }

  it { is_expected.to define_array_prop(:column_definitions).with_default([]) }
  it { is_expected.to define_prop(:depth) }
  it { is_expected.to define_prop(:row) }
  it {
    is_expected.to define_enum_prop(:enable_toggle_expansion)
      .with_default("header")
      .with_values("all", "header", "none")
  }
  it { is_expected.to define_string_prop(:subrow_header).with_default("") }
  it { is_expected.to define_boolean_prop(:collapsible_trail).with_default(true) }
  it { is_expected.to define_hash_prop(:subrow_data_attributes).with_default({}) }
  it {
    is_expected.to define_enum_prop(:responsive)
      .with_default("scroll")
      .with_values("none", "scroll")
  }

  describe "#classname" do
    context "basic functionality" do
      it "returns base class name for root subrow" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.classname).to eq "pb_table_tr bg-silver pb_subrow_header "
      end

      it "includes depth class for nested subrows", :aggregate_failures do
        expect(subject.new(row: {}, depth: 1).classname).to eq "pb_table_tr bg-silver pb_subrow_header depth-sub-row-1"
        expect(subject.new(row: {}, depth: 2).classname).to eq "pb_table_tr bg-silver pb_subrow_header depth-sub-row-2"
        expect(subject.new(row: {}, depth: 3).classname).to eq "pb_table_tr bg-silver pb_subrow_header depth-sub-row-3"
      end

      it "does not include depth class for root subrows" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.classname).not_to include "depth-sub-row"
      end
    end

    context "with additional classname" do
      it "includes additional classes" do
        instance = subject.new(row: {}, depth: 0, classname: "custom-subrow-class")
        expect(instance.classname).to eq "pb_table_tr bg-silver pb_subrow_header  custom-subrow-class"
      end

      it "combines depth class with additional classes" do
        instance = subject.new(row: {}, depth: 2, classname: "toggle-content expanded")
        expect(instance.classname).to eq "pb_table_tr bg-silver pb_subrow_header depth-sub-row-2 toggle-content expanded"
      end
    end
  end

  describe "#td_classname" do
    context "basic functionality" do
      let(:instance) { subject.new(row: {}, depth: 0, responsive: "none") }

      it "returns basic td classes" do
        expect(instance.td_classname(0)).to eq "id-cell"
        expect(instance.td_classname(1)).to eq "id-cell"
        expect(instance.td_classname(2)).to eq "id-cell"
      end
    end

    context "with scroll responsive" do
      let(:instance) { subject.new(row: {}, depth: 0, responsive: "scroll") }

      it "includes pinned-left for first column" do
        expect(instance.td_classname(0)).to eq "id-cell pinned-left"
      end

      it "does not include pinned-left for other columns" do
        expect(instance.td_classname(1)).to eq "id-cell"
        expect(instance.td_classname(2)).to eq "id-cell"
        expect(instance.td_classname(5)).to eq "id-cell"
      end
    end

    context "with none responsive" do
      let(:instance) { subject.new(row: {}, depth: 1, responsive: "none") }

      it "does not include pinned-left for any column" do
        expect(instance.td_classname(0)).to eq "id-cell"
        expect(instance.td_classname(1)).to eq "id-cell"
      end
    end
  end

  describe "#data" do
    context "with subrow_data_attributes" do
      let(:subrow_attributes) { { advanced_table_content: "123-456", row_depth: 2, row_parent: "table_123" } }
      let(:instance) { subject.new(row: {}, depth: 1, subrow_data_attributes: subrow_attributes) }

      it "merges subrow_data_attributes with prop data" do
        expect(instance.data).to include(subrow_attributes)
      end

      it "includes prop data when provided" do
        instance = subject.new(
          row: {},
          depth: 1,
          subrow_data_attributes: subrow_attributes,
          data: { custom_attr: "custom_value" }
        )
        expect(instance.data).to include(subrow_attributes)
        expect(instance.data).to include(custom_attr: "custom_value")
      end

      it "prioritizes subrow_data_attributes over prop data for same keys" do
        instance = subject.new(
          row: {},
          depth: 1,
          subrow_data_attributes: { row_depth: 2 },
          data: { row_depth: 1 }
        )
        expect(instance.data[:row_depth]).to eq 2
      end
    end

    context "without subrow_data_attributes" do
      let(:instance) { subject.new(row: {}, depth: 0) }

      it "returns empty hash when no data provided" do
        expect(instance.data).to eq({})
      end

      it "returns prop data when provided" do
        instance = subject.new(row: {}, depth: 0, data: { custom_attr: "value" })
        expect(instance.data).to eq(custom_attr: "value")
      end
    end
  end

  describe "prop behavior" do
    context "subrow_header prop" do
      it "defaults to empty string" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.subrow_header).to eq ""
      end

      it "accepts custom subrow header text" do
        instance = subject.new(row: {}, depth: 0, subrow_header: "Department Summary")
        expect(instance.subrow_header).to eq "Department Summary"
      end
    end

    context "collapsible_trail prop" do
      it "defaults to true" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.collapsible_trail).to be true
      end

      it "can be set to false" do
        instance = subject.new(row: {}, depth: 0, collapsible_trail: false)
        expect(instance.collapsible_trail).to be false
      end
    end

    context "enable_toggle_expansion prop" do
      it "defaults to header" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.enable_toggle_expansion).to eq "header"
      end

      it "accepts all valid values" do
        expect(subject.new(row: {}, depth: 0, enable_toggle_expansion: "all").enable_toggle_expansion).to eq "all"
        expect(subject.new(row: {}, depth: 0, enable_toggle_expansion: "header").enable_toggle_expansion).to eq "header"
        expect(subject.new(row: {}, depth: 0, enable_toggle_expansion: "none").enable_toggle_expansion).to eq "none"
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

    context "column_definitions prop" do
      it "defaults to empty array" do
        instance = subject.new(row: {}, depth: 0)
        expect(instance.column_definitions).to eq []
      end

      it "accepts column definitions" do
        columns = [{ accessor: "name", label: "Name" }, { accessor: "value", label: "Value" }]
        instance = subject.new(row: {}, depth: 0, column_definitions: columns)
        expect(instance.column_definitions).to eq columns
      end
    end
  end

  describe "integration scenarios" do
    context "typical subrow header usage" do
      let(:column_definitions) do
        [
          { accessor: "name", label: "Name" },
          { accessor: "department", label: "Department" },
          { accessor: "salary", label: "Salary" },
        ]
      end

      let(:subrow_data_attributes) do
        {
          advanced_table_content: "123-456-789",
          row_depth: 2,
          row_parent: "advanced_table_123",
        }
      end

      let(:instance) do
        subject.new(
          row: { department: "Ghost Crew", count: 5 },
          depth: 2,
          column_definitions: column_definitions,
          subrow_header: "Ghost Crew",
          responsive: "scroll",
          subrow_data_attributes: subrow_data_attributes,
          classname: "toggle-content"
        )
      end

      it "combines all features correctly" do
        expect(instance.classname).to include "pb_table_tr"
        expect(instance.classname).to include "bg-silver"
        expect(instance.classname).to include "pb_subrow_header"
        expect(instance.classname).to include "depth-sub-row-2"
        expect(instance.classname).to include "toggle-content"

        expect(instance.td_classname(0)).to include "pinned-left"
        expect(instance.td_classname(1)).not_to include "pinned-left"

        expect(instance.data).to include(subrow_data_attributes)
        expect(instance.subrow_header).to eq "Ghost Crew"
        expect(instance.column_definitions).to eq column_definitions
      end
    end
  end
end
