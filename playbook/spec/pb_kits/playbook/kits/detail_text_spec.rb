# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_detail_text/detail_text"

RSpec.describe Playbook::PbDetailText::DetailText do
  subject { Playbook::PbDetailText::DetailText }

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

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_detail_text_kit_light"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_detail_text_kit_light additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_detail_text_kit_light dark"
      expect(subject.new(dark: true, color: "link").classname).to eq "pb_detail_text_kit_link dark"
    end
  end
end
