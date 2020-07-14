# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_gauge/gauge"

RSpec.describe Playbook::PbGauge::Gauge do
  subject { Playbook::PbGauge::Gauge }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:chart_data).of_type(Playbook::Props::Array).with_default([{ name: "Name", value: 0 }]) }
  it { is_expected.to define_enum_prop(:style).with_default("solidgauge") }
  it { is_expected.to define_prop(:title).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:subtitle).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:prefix).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:suffix).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:height).of_type(Playbook::Props::String).with_default(nil) }
  it { is_expected.to define_boolean_prop(:full_circle).with_default(false) }
  it { is_expected.to define_boolean_prop(:show_labels).with_default(false) }
  it { is_expected.to define_prop(:min).of_type(Playbook::Props::Numeric).with_default(0) }
  it { is_expected.to define_prop(:max).of_type(Playbook::Props::Numeric).with_default(100) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_gauge_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_gauge_kit additional_class"
    end
  end
end
