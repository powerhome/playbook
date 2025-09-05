# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_section_separator/section_separator"

RSpec.describe Playbook::PbSectionSeparator::SectionSeparator do
  subject { Playbook::PbSectionSeparator::SectionSeparator }

  it { is_expected.to define_prop(:text) }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("card")
      .with_values("card", "background")
  }
  it {
    is_expected.to define_enum_prop(:orientation)
      .with_default("horizontal")
      .with_values("horizontal", "vertical")
  }
  it {
    is_expected.to define_boolean_prop(:dark)
      .with_default(false)
  }
  it {
    is_expected.to define_enum_prop(:color)
      .with_default("default")
      .with_values("default", "primary")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default additional_class"
      expect(subject.new(variant: "background", classname: "additional_class", dark: true).classname).to eq "pb_section_separator_kit pb_section_separator_background pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default additional_class dark"
      expect(subject.new(orientation: "vertical", classname: "additional_class", dark: true).classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_vertical pb_section_separator_solid pb_section_separator_color_default additional_class dark"
      expect(subject.new(classname: "additional_class", dark: true).classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_default additional_class dark"
      expect(subject.new(line_style: "dashed").classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_dashed pb_section_separator_color_default"
      expect(subject.new(color: "primary").classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_solid pb_section_separator_color_primary"
      expect(subject.new(color: "primary", orientation: "vertical", dark: true).classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_vertical pb_section_separator_solid pb_section_separator_color_primary dark"
      expect(subject.new(color: "default", line_style: "dashed").classname).to eq "pb_section_separator_kit pb_section_separator_card pb_section_separator_horizontal pb_section_separator_dashed pb_section_separator_color_default"
    end
  end
end
