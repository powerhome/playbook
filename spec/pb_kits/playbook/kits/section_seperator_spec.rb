# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_section_separator/section_separator"

RSpec.describe Playbook::PbSectionSeparator::SectionSeparator do
  subject { Playbook::PbSectionSeparator::SectionSeparator }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_enum_prop(:variant)
                      .with_default("card")
                      .with_values("card", "background") }
   describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_section_separator_kit_card"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_section_separator_kit_card additional_class"
    end
  end
end
