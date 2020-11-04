# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/timeline"

RSpec.describe Playbook::PbTimeline::Timeline do
  subject { Playbook::PbTimeline::Timeline }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_default("horizontal")
                      .with_values("vertical", "horizontal") }
  it { is_expected.to define_boolean_prop(:show_date)
                      .with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_timeline_kit_horizontal"
      expect(subject.new(orientation: "horizontal").classname).to eq "pb_timeline_kit_horizontal"
      expect(subject.new(orientation: "vertical").classname).to eq "pb_timeline_kit_vertical"
      expect(subject.new(orientation: "horizontal", show_date: true).classname).to eq "pb_timeline_kit_horizontal_with_date"
      expect(subject.new(orientation: "vertical", show_date: true).classname).to eq "pb_timeline_kit_vertical_with_date"

    end
  end
end
