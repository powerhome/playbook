# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/node_area"

RSpec.describe Playbook::PbTimeline::NodeArea do
  subject { Playbook::PbTimeline::NodeArea }

  it { is_expected.to define_prop(:icon) }

  it {
    is_expected.to define_enum_prop(:icon_color)
      .with_default("default")
      .with_values("default", "royal", "blue", "purple", "teal", "red", "yellow", "green")
  }

  describe "#classname" do
    it "returns the correct class name" do
      expect(subject.new.classname).to eq "pb_timeline_item_step"
    end
  end
end
