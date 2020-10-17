# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time_range_inline/time_range_inline"

RSpec.describe Playbook::PbTimeRangeInline::TimeRangeInline do
  subject { Playbook::PbTimeRangeInline::TimeRangeInline }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:start_time) }
  it { is_expected.to define_prop(:end_time) }
  it { is_expected.to define_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:icon).with_default(false) }
  it { is_expected.to define_prop(:timezone).with_default(false) }

  it do
    is_expected.to define_enum_prop(:alignment)
      .with_default("left")
      .with_values("left", "center", "right")
  end

  it do
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("sm", "xs")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { start_time: "2012-08-02T15:49:29Z", end_time: "2012-08-02T17:49:29Z" }

      expect(subject.new(required_props).classname).to eq "pb_time_range_inline_kit_left"
      expect(subject.new(required_props.merge(alignment: "center")).classname).to eq "pb_time_range_inline_kit_center"
      expect(subject.new(required_props.merge(alignment: "right")).classname).to eq "pb_time_range_inline_kit_right"
    end
  end
end
