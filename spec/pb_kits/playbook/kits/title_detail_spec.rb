# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_title_detail/title_detail"

RSpec.describe Playbook::PbTitleDetail::TitleDetail do
  subject { Playbook::PbTitleDetail::TitleDetail }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:title).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:detail).of_type(Playbook::Props::String) }
  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right")
                      .with_default("left") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_title_detail_kit_left"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_title_detail_kit_left additional_class"
      expect(subject.new(align: "center").classname).to eq "pb_title_detail_kit_center"
    end
  end

  describe "#title?" do
    it "returns true when a title prop is passed, and false when a title prop is not", :aggregate_failures do
      expect(subject.new({}).title?).to eq false
      expect(subject.new({title: ""}).title?).to eq false
      expect(subject.new({title: "Title"}).title?).to eq true
    end
  end

  describe "#detail?" do
    it "returns true when a detail prop is passed, and false when a detail prop is not", :aggregate_failures do
      expect(subject.new({}).detail?).to eq false
      expect(subject.new({detail: ""}).detail?).to eq false
      expect(subject.new({detail: "Additional detail info"}).detail?).to eq true
    end
  end
end
