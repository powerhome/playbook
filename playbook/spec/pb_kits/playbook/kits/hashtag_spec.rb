# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_hashtag/hashtag"

RSpec.describe Playbook::PbHashtag::Hashtag do
  subject { Playbook::PbHashtag::Hashtag }

  it { is_expected.to define_prop(:text) }
  it {
    is_expected.to define_enum_prop(:type)
      .with_default("default")
      .with_values("default", "project", "home", "appointment")
  }
  it { is_expected.to define_prop(:url) }

  it {
    is_expected.to define_boolean_prop(:new_window)
      .with_default(false)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_hastag_kit"
      expect(subject.new(dark: true).classname).to eq "pb_hastag_kit dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_hastag_kit additional_class"
    end
  end

  describe "#window_target" do
    it "should allow links to open in a new window", :aggregate_failures do
      expect(subject.new({}).link_option).to eq "_self"
      expect(subject.new({ new_window: true }).link_option).to eq "_blank"
    end
  end
end
