# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::PbBadge::Badge do
  subject { Playbook::PbBadge::Badge }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:rounded).with_default(false) }
  it { is_expected.to define_enum_prop(:variant)
                      .with_default("neutral")
                      .with_values("success", "warning", "error", "info", "neutral", "primary") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_badge_kit_neutral"
      expect(subject.new(variant: "warning").classname).to eq "pb_badge_kit_warning"
      expect(subject.new(rounded: true).classname).to eq "pb_badge_kit_neutral_rounded"
      expect(subject.new(dark: true).classname).to eq "pb_badge_kit_neutral_dark dark"
      expect(subject.new(variant: "error", rounded: true).classname).to eq "pb_badge_kit_error_rounded"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_badge_kit_neutral additional_class"
    end
  end
end
