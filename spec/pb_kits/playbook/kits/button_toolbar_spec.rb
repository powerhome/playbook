# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_button_toolbar/button_toolbar"

RSpec.describe Playbook::PbButtonToolbar::ButtonToolbar do
  subject { Playbook::PbButtonToolbar::ButtonToolbar }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:orientation)
                  .with_default("horizontal")
                  .with_values("horizontal", "vertical") }
  it { is_expected.to define_enum_prop(:variant)
                  .with_default("primary")
                  .with_values("primary", "secondary") }
  it { is_expected.to define_boolean_prop(:connected).with_default(false) }
  it { is_expected.to define_prop(:text) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_button_toolbar_kit_horizontal_primary"
      expect(subject.new(connected: true).classname).to eq "pb_button_toolbar_kit_horizontal_primary_connected"
      expect(subject.new(variant: "primary").classname).to eq "pb_button_toolbar_kit_horizontal_primary"
      expect(subject.new(variant: "secondary").classname).to eq "pb_button_toolbar_kit_horizontal_secondary"
      expect(subject.new(orientation: "vertical").classname).to eq "pb_button_toolbar_kit_vertical_primary"
      expect(subject.new(orientation: "vertical", variant: "primary").classname).to eq "pb_button_toolbar_kit_vertical_primary"
      expect(subject.new(orientation: "vertical", variant: "secondary").classname).to eq "pb_button_toolbar_kit_vertical_secondary"
      expect(subject.new(orientation: "vertical", connected: true).classname).to eq "pb_button_toolbar_kit_vertical_primary_connected"
    end
  end
end
