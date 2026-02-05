# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_caption/caption"

RSpec.describe Playbook::PbCaption::Caption do
  subject { Playbook::PbCaption::Caption }

  it {
    is_expected.to define_enum_prop(:color)
      .with_default(nil)
      .with_values(nil, "default", "light", "lighter", "success", "error", "link")
  }

  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default("md")
      .with_values("xs", "md", "lg")
  }
  it do
    is_expected.to define_enum_prop(:tag)
      .with_default("div")
      .with_values("h1", "h2", "h3", "h4", "h5",
                   "h6", "p", "span", "div", "caption")
  end
  it { is_expected.to define_string_prop(:text) }

  describe "#caption output" do
    it "returns text output", :aggregate_failures do
      expect(subject.new(text: "Caption Text").text).to eq "Caption Text"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_caption_kit_md"
      expect(subject.new(dark: true).classname).to eq "pb_caption_kit_md dark"
      expect(subject.new(size: "lg").classname).to eq "pb_caption_kit_lg"
      expect(subject.new(size: "xs").classname).to eq "pb_caption_kit_xs"
      expect(subject.new(dark: true, size: "lg").classname).to eq "pb_caption_kit_lg dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_caption_kit_md additional_class"
      expect(subject.new(classname: "additional_class", color: "light").classname).to eq "pb_caption_kit_md_light additional_class"
      expect(subject.new(color: "lighter").classname).to eq "pb_caption_kit_md_lighter"
    end
  end
end
