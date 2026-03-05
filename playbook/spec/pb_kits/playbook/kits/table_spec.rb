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
  it { is_expected.to define_enum_prop(:header_style).with_default("default").with_values("default", "borderless", "floating") }
  it { is_expected.to define_enum_prop(:variant).with_default("default").with_values("default", "with_filter") }
  it { is_expected.to define_hash_prop(:filter_props).with_default({}) }
  it { is_expected.to define_prop(:filter_content) }
  it { is_expected.to define_string_prop(:title) }
  it { is_expected.to define_hash_prop(:card_props).with_default({}) }
  it { is_expected.to define_hash_prop(:title_props).with_default({}) }

  describe "#container" do
    it "returns false when it is specified" do
      expect(subject.new(container: false).container).to eq false
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_table table-md table-card table-collapse-sm table-responsive-collapse"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_table table-md table-card table-collapse-sm table-responsive-collapse additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_table table-md table-dark table-card table-collapse-sm table-responsive-collapse dark"
      expect(subject.new(data_table: true).classname).to eq "pb_table table-md table-card data_table table-collapse-sm table-responsive-collapse"
      expect(subject.new(size: "sm").classname).to eq "pb_table table-sm table-card table-collapse-sm table-responsive-collapse"
      expect(subject.new(single_line: true).classname).to eq "pb_table table-md single-line table-card table-collapse-sm table-responsive-collapse"
      expect(subject.new(container: false).classname).to eq "pb_table table-md table-collapse-sm table-responsive-collapse"
      expect(subject.new(disable_hover: true).classname).to eq "pb_table table-md no-hover table-card table-collapse-sm table-responsive-collapse"
      expect(subject.new(disable_hover: true, dark: true, size: "lg", single_line: true).classname).to eq "pb_table table-lg single-line table-dark no-hover table-card table-collapse-sm table-responsive-collapse dark"
      expect(subject.new(sticky: true).classname).to eq "pb_table table-md table-card sticky-header table-collapse-sm table-responsive-collapse"
      expect(subject.new(outer_padding: "sm").classname).to eq "pb_table table-md table-card table-collapse-sm outer_padding_space_sm table-responsive-collapse"
      expect(subject.new(sticky_left_column: %w[1 2 3]).classname).to eq "pb_table table-md table-card sticky-left-column sticky-left-columns-ids-1-2-3 table-collapse-sm table-responsive-collapse"
      expect(subject.new(header_style: "borderless").classname).to eq "pb_table table-md table-card table-collapse-sm table-responsive-collapse header-borderless"
      expect(subject.new(header_style: "floating").classname).to eq "pb_table table-md table-card table-collapse-sm table-responsive-collapse header-floating"
    end
  end

  describe "#with_filter_variant?" do
    it "returns true when variant is with_filter" do
      expect(subject.new(variant: "with_filter").with_filter_variant?).to eq true
    end

    it "returns false when variant is default" do
      expect(subject.new(variant: "default").with_filter_variant?).to eq false
    end

    it "returns false when variant is not specified" do
      expect(subject.new({}).with_filter_variant?).to eq false
    end
  end

  describe "with_filter variant" do
    it "sets container to false automatically" do
      table = subject.new(variant: "with_filter")
      expect(table.classname).not_to include("table-card")
    end

    it "uses md collapse by default for with_filter variant" do
      table = subject.new(variant: "with_filter")
      expect(table.classname).to include("table-collapse-md")
    end
  end
end
