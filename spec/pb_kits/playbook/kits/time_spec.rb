# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time/time"

RSpec.describe Playbook::PbTime::Time do
  subject { Playbook::PbTime::Time }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:time) }
  it { is_expected.to define_prop(:show_icon).with_default(false) }
  it { is_expected.to define_prop(:time) }
  it { is_expected.to define_prop(:timezone).with_default("America/New_York") }
  it do
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("lg", "sm")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { time: Time.now }

      expect(subject.new(required_props).classname).to eq "pb_time_kit_sm"
      expect(subject.new(required_props.merge(size: "lg")).classname).to eq "pb_time_kit_lg"
    end
  end
end
