# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_progress_step/progress_step"

RSpec.describe Playbook::PbProgressStep::ProgressStep do
  subject { Playbook::PbProgressStep::ProgressStep }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_default("horizontal")
                      .with_values("vertical", "horizontal") }
  it { is_expected.to define_boolean_prop(:icon)
                      .with_default(false) }
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }             

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_progress_step_kit_horizontal"
      expect(subject.new(orientation: "vertical").classname).to eq "pb_progress_step_kit_vertical"
      expect(subject.new(orientation: "horizontal", icon: true).classname).to eq "pb_progress_step_kit_horizontal_icon"
      expect(subject.new(orientation: "vertical", icon: true).classname).to eq "pb_progress_step_kit_vertical_icon"
      expect(subject.new(dark: true).classname).to eq "pb_progress_step_kit_horizontal_dark"
      expect(subject.new(orientation: "vertical", dark: true).classname).to eq "pb_progress_step_kit_vertical_dark"
      expect(subject.new(orientation: "horizontal", icon: true, dark: true).classname).to eq "pb_progress_step_kit_horizontal_icon_dark"
      expect(subject.new(orientation: "vertical", icon: true, dark: true).classname).to eq "pb_progress_step_kit_vertical_icon_dark"

    end
  end
end
