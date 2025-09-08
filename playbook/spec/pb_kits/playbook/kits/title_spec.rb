# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_title/title"

RSpec.describe Playbook::PbTitle::Title do
  subject { Playbook::PbTitle::Title }

  it {
    is_expected.to define_enum_prop(:color)
      .with_default(nil)
      .with_values(nil, "default", "light", "lighter", "success", "error", "link")
  }

  it {
    is_expected.to define_boolean_prop(:dark)
      .with_default(false)
  }
  it { is_expected.to define_prop(:size).with_default(3) }
  it {
    is_expected.to define_enum_prop(:tag)
      .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span")
      .with_default("h3")
  }

  it {
    is_expected.to define_boolean_prop(:bold)
      .with_default(true)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_title_kit pb_title_3"

      expect(subject.new(classname: "additional_class").classname).to eq "pb_title_kit pb_title_3 additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_title_kit pb_title_3 dark"
      expect(subject.new(size: nil).classname).to eq "pb_title_kit pb_title_3"
      expect(subject.new(size: 4).classname).to eq "pb_title_kit pb_title_4"
      expect(subject.new(tag: "h3").classname).to eq "pb_title_kit pb_title_3"
      expect(subject.new(size: 4, color: "link").classname).to eq "pb_title_kit pb_title_4 pb_title_link"
      expect(subject.new(bold: false).classname).to eq "pb_title_kit pb_title_3 pb_title_thin"
      expect(subject.new(size: { xs: 3, sm: 2, md: 1 }).classname).to eq "pb_title_kit pb_title_xs_3 pb_title_sm_2 pb_title_md_1"
    end
  end

  describe "rendered content" do
    it "contains content if text is passed to the block" do
      expect((subject.new({}) { "sample text" }).children).to be_truthy
    end
  end
end
