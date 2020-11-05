# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_hashtag/hashtag"

RSpec.describe Playbook::PbHashtag::Hashtag do
  subject { Playbook::PbHashtag::Hashtag }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_enum_prop(:type)
                      .with_default("default")
                      .with_values("default", "project", "home", "appointment") }
  it { is_expected.to define_prop(:url) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_hastag_kit"
      expect(subject.new(dark: true).classname).to eq "pb_hastag_kit dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_hastag_kit additional_class"
    end
  end
end
