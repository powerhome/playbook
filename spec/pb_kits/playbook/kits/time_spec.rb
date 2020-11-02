# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time/time"

RSpec.describe Playbook::PbTime::Time do
  subject { Playbook::PbTime::Time }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:show_timezone).with_default(false) }
  it { is_expected.to define_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:time) }
  it { is_expected.to define_prop(:show_icon).with_default(false) }
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

  describe "#format_time_string" do
    it "returns a formatted string" do
      time = Time.new(2002, 04, 06, 9, 1, 1, "-05:00")
      # -05:00, 5 hrs. behind UTC (East Coast)
      expect([" 9:01a", " 10:01a"]).to include(subject.new(time: time).format_time_string)
      # This test accomodates daylight savings
    end

    it "returns a formatted string that respects a timezone" do
      time = Time.new(2002, 04, 06, 9, 1, 1, "-05:00")
      # -05:00, 5 hrs. behind UTC (East Coast)
      expect([" 6:01a", " 7:01a"]).to include(subject.new(time: time, timezone: "America/Los_Angeles").format_time_string)
      # This test accomodates daylight savings
    end
  end

  describe "#format_timezone" do
    it "returns the default formatted timezone" do
      expect(['EDT', 'EST']).to include(subject.new(time: DateTime.current).format_timezone_string)
    end

    it "returns a unique formatted timezone" do
      expect(subject.new(time: DateTime.current, timezone: "Asia/Tokyo").format_timezone_string).to eq "JST"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { time: Time.now }

      expect(subject.new(required_props).classname).to eq "pb_time_kit_left_sm"
      expect(subject.new(required_props.merge(size: "md")).classname).to eq "pb_time_kit_left_md"
      expect(subject.new(required_props.merge(size: "lg")).classname).to eq "pb_time_kit_left_md"
      expect(subject.new(required_props.merge(size: "xs")).classname).to eq "pb_time_kit_left_sm"
      expect(subject.new(required_props.merge(align: "center")).classname).to eq "pb_time_kit_center_sm"
      expect(subject.new(required_props.merge(size: "md", align: "right")).classname).to eq "pb_time_kit_right_md"
      expect(subject.new(required_props.merge(dark: true)).classname).to eq "pb_time_kit_left_sm dark"
    end
  end
end
