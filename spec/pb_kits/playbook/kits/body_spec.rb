# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::PbBody::Body do
  subject { Playbook::PbBody::Body }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:color)
    .with_default("default")
    .with_values("default", "light", "lighter", "dark", "light_dark", "lighter_dark") }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_enum_prop(:status)
    .with_default("neutral")
    .with_values("neutral", "negative", "positive") }
  it { is_expected.to define_enum_prop(:tag)
    .with_default("div")
    .with_values("h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div") }
  it { is_expected.to define_prop(:text) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_body_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_body_kit additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_body_kit_dark"
      expect(subject.new(dark: true, color: "light").classname).to eq "pb_body_kit_light_dark"
      expect(subject.new(status: "negative").classname).to eq "pb_body_kit_negative"
    end
  end
end
