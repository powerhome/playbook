# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table"

RSpec.describe Playbook::PbTable::Table do
  subject { Playbook::PbTable::Table }

  it {
    is_expected.to define_enum_prop(:size)
      .with_default("md")
      .with_values("sm", "md", "lg")
  }
  it { is_expected.to define_boolean_prop(:single_line).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:data_table).with_default(false) }
  it { is_expected.to define_boolean_prop(:disable_hover).with_default(false) }
  it { is_expected.to define_boolean_prop(:container).with_default(true) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_boolean_prop(:sticky).with_default(false) }
  it { is_expected.to define_enum_prop(:tag).with_default("table").with_values("div", "table") }

  describe "#container" do
    it "returns false when it is specified" do
      expect(subject.new(container: false).container).to eq false
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_table table-md table-card table-collapse-sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_table table-md table-card table-collapse-sm additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_table table-md table-dark table-card table-collapse-sm dark"
      expect(subject.new(data_table: true).classname).to eq "pb_table table-md table-card data_table table-collapse-sm"
      expect(subject.new(size: "sm").classname).to eq "pb_table table-sm table-card table-collapse-sm"
      expect(subject.new(single_line: true).classname).to eq "pb_table table-md single-line table-card table-collapse-sm"
      expect(subject.new(container: false).classname).to eq "pb_table table-md table-collapse-sm"
      expect(subject.new(disable_hover: true).classname).to eq "pb_table table-md no-hover table-card table-collapse-sm"
      expect(subject.new(disable_hover: true, dark: true, size: "lg", single_line: true).classname).to eq "pb_table table-lg single-line table-dark no-hover table-card table-collapse-sm dark"
      expect(subject.new(sticky: true).classname).to eq "pb_table table-md table-card sticky-header table-collapse-sm"
      expect(subject.new(outer_padding: "sm").classname).to eq "pb_table table-md table-card table-collapse-sm outer_padding_space_sm"
      expect(subject.new(sticky_left_column: %w[1 2 3]).classname).to eq "pb_table table-md table-card sticky-left-column sticky-columns-1-2-3 table-collapse-sm"
    end
  end
end
