# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_progress_step/progress_step"

RSpec.describe Playbook::PbProgressStep::ProgressStep do
  subject { Playbook::PbProgressStep::ProgressStep }

  it {
    is_expected.to define_enum_prop(:orientation)
      .with_default("horizontal")
      .with_values("vertical", "horizontal")
  }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("default")
      .with_values("default", "tracker")
  }
  it {
    is_expected.to define_boolean_prop(:icon)
      .with_default(false)
  }
  it {
    is_expected.to define_enum_prop(:color)
      .with_default("primary")
      .with_values("primary", "info")
  }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_progress_step_kit_horizontal"
      expect(subject.new(orientation: "vertical").classname).to eq "pb_progress_step_kit_vertical"

      expect(subject.new(orientation: "horizontal", icon: true).classname).to eq "pb_progress_step_kit_horizontal_icon"
      expect(subject.new(variant: "tracker").classname).to eq "pb_progress_step_kit_horizontal_tracker"
      expect(subject.new(variant: "tracker", color: "info").classname).to eq "pb_progress_step_kit_horizontal_tracker_info"
      expect(subject.new(orientation: "vertical", icon: true).classname).to eq "pb_progress_step_kit_vertical_icon"

      expect(subject.new(dark: true).classname).to eq "pb_progress_step_kit_horizontal dark"
      expect(subject.new(orientation: "vertical", dark: true).classname).to eq "pb_progress_step_kit_vertical dark"

      expect(subject.new(orientation: "horizontal", icon: true, dark: true).classname).to eq "pb_progress_step_kit_horizontal_icon dark"
      expect(subject.new(orientation: "vertical", icon: true, dark: true).classname).to eq "pb_progress_step_kit_vertical_icon dark"
    end
  end
end
