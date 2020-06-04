# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/timeline"

RSpec.describe Playbook::PbTimeline::Timeline do
  subject { Playbook::PbTimeline::Timeline }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_default("horizontal")
                      .with_values("vertical", "horizontal") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_timeline_kit_horizontal"
      expect(subject.new(orientation: "horizontal").classname).to eq "pb_timeline_kit_horizontal"
      expect(subject.new(orientation: "vertical").classname).to eq "pb_timeline_kit_vertical"

    end
  end
end
