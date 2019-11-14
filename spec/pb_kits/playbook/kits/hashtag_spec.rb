# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_tag/tag"

RSpec.describe Playbook::PbTag::Tag do
  subject { Playbook::PbTag::Tag }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_enum_prop(:type)
                      .with_default("default")
                      .with_values("default", "project", "home") }
  it { is_expected.to define_prop(:url) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_hastag_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_hastag_kit additional_class"
    end
  end
end
