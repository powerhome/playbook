# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table"

RSpec.describe Playbook::PbTable::Table do
  subject { Playbook::PbTable::Table }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:size)
                      .with_default("md")
                      .with_values("sm", "md", "lg") }
  it { is_expected.to define_boolean_prop(:single_line).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:data_table).with_default(false) }
  it { is_expected.to define_boolean_prop(:disable_hover).with_default(false) }
  it { is_expected.to define_boolean_prop(:container).with_default(true) }
  it { is_expected.to define_prop(:text) }

  describe "#container" do
    it "returns false when it is specified" do
      expect(subject.new(container: false).container).to eq false
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_table table-md table-card"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_table table-md table-card additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_table table-md dark table-card"
      expect(subject.new(data_table: true).classname).to eq "pb_table table-md table-card data_table"
      expect(subject.new(size: "sm").classname).to eq "pb_table table-sm table-card"
      expect(subject.new(single_line: true).classname).to eq "pb_table table-md single-line table-card"
      expect(subject.new(container: false).classname).to eq "pb_table table-md"
      expect(subject.new(disable_hover: true).classname).to eq "pb_table table-md no-hover table-card"
      expect(subject.new(disable_hover: true, dark: true, size: "lg", single_line: true).classname).to eq "pb_table table-lg single-line dark no-hover table-card"
    end
  end
end
