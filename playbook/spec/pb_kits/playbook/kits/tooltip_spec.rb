# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_tooltip/tooltip"

RSpec.describe Playbook::PbTooltip::Tooltip do
  subject { Playbook::PbTooltip::Tooltip }

  it { is_expected.to define_prop(:position) }
  it { is_expected.to define_prop(:trigger_element_id) }
  it { is_expected.to define_prop(:trigger_element_selector) }
  it { is_expected.to define_prop(:tooltip_id) }
  it { is_expected.to define_prop(:delay_open) }
  it { is_expected.to define_prop(:delay_close) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:use_click_to_open).with_default(false) }

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

    it "includes use_click_to_open in data attributes" do
      tooltip = subject.new(use_click_to_open: true)
      data = tooltip.data
      expect(data).to include(pb_tooltip_use_click_to_open: true)
    end

    it "sets effective trigger method in data when use_click_to_open is true" do
      tooltip = subject.new(use_click_to_open: true, trigger_method: "hover")
      data = tooltip.data
      expect(data).to include(pb_tooltip_trigger_method: "click")
    end
  end

  describe "#effective_trigger_method" do
    it "returns 'click' when use_click_to_open is true" do
      tooltip = subject.new(use_click_to_open: true)
      expect(tooltip.effective_trigger_method).to eq "click"
    end

    it "returns 'click' when use_click_to_open is true regardless of trigger_method" do
      tooltip = subject.new(use_click_to_open: true, trigger_method: "hover")
      expect(tooltip.effective_trigger_method).to eq "click"
    end

    it "returns trigger_method when use_click_to_open is false" do
      tooltip = subject.new(use_click_to_open: false, trigger_method: "hover")
      expect(tooltip.effective_trigger_method).to eq "hover"
    end

    it "returns default trigger_method when use_click_to_open is false and no trigger_method specified" do
      tooltip = subject.new(use_click_to_open: false)
      expect(tooltip.effective_trigger_method).to eq "hover"
    end
  end
end
