# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_detail/detail"

RSpec.describe Playbook::PbDetail::Detail do
  subject { Playbook::PbDetail::Detail }

  it {
    is_expected.to define_enum_prop(:color)
      .with_default("light")
      .with_values("light", "default", "lighter", "link", "success", "error")
  }

  it { is_expected.to define_boolean_prop(:dark).with_default(false) }

  it {
    is_expected.to define_enum_prop(:tag)
      .with_default("div")
      .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div")
  }

  it { is_expected.to define_prop(:text) }

  it { is_expected.to define_prop(:bold) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_detail_kit_light"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_detail_kit_light additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_detail_kit_light dark"
      expect(subject.new(dark: true, color: "link").classname).to eq "pb_detail_kit_link dark"
      expect(subject.new(bold: true).classname).to eq "pb_detail_kit_light bold"
    end
  end
end
