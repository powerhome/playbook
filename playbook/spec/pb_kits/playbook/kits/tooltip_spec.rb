# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_tooltip/tooltip"

RSpec.describe Playbook::PbTooltip::Tooltip do
  subject { Playbook::PbTooltip::Tooltip }

  it { is_expected.to define_prop(:position) }
  it { is_expected.to define_prop(:trigger_element_id) }
  it { is_expected.to define_prop(:trigger_element_selector) }
  it { is_expected.to define_prop(:tooltip_id) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:delay_open) }
  it { is_expected.to define_prop(:delay_close) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(dark: true).classname).to eq "pb_tooltip_kit_dark dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_tooltip_kit additional_class"
    end
  end

  describe "#data" do
    it "has correct delay values", :aggregate_failures do
      tooltip = subject.new(delay_open: 1000, delay_close: 0)
      data = tooltip.data
      expect(data).to include(pb_tooltip_delay_open: 1000)
      expect(data).to include(pb_tooltip_delay_close: 0)
    end

    it "has correct tooltip configuration values" do
      tooltip = subject.new(tooltip_id: "test-id", trigger_element_id: "trigger-id", trigger_element_selector: "selector-id")
      data = tooltip.data
      expect(data).to include(
        pb_tooltip_show_tooltip: true,
        pb_tooltip_tooltip_id: "test-id",
        pb_tooltip_trigger_element_id: "trigger-id",
        pb_tooltip_trigger_element_selector: "selector-id",
        pb_tooltip_trigger_method: "hover"
      )
    end
  end
end
