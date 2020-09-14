# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time/time"

RSpec.describe Playbook::PbTime::Time do
  subject { Playbook::PbTime::Time }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:show_timezone).with_default(false) }
  it { is_expected.to define_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:time) }
  it { is_expected.to define_prop(:timezone).with_default("America/New_York") }
  it do
    is_expected.to define_enum_prop(:align)
      .with_default("left")
      .with_values("left", "center", "right")
  end
  it do
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("lg","md", "sm", "xs")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { time: Time.now }

      expect(subject.new(required_props).classname).to eq "pb_time_kit_left_sm"
      expect(subject.new(required_props.merge(size: "md")).classname).to eq "pb_time_kit_left_md"
      expect(subject.new(required_props.merge(align: "center")).classname).to eq "pb_time_kit_center_sm"
      expect(subject.new(required_props.merge(size: "md", align: "right")).classname).to eq "pb_time_kit_right_md"
      expect(subject.new(required_props.merge(dark: true)).classname).to eq "pb_time_kit_left_sm dark"
    end
  end
end
