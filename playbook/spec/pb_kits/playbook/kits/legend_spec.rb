# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_legend/legend"

RSpec.describe Playbook::PbLegend::Legend do
  subject { Playbook::PbLegend::Legend }

  it {
    is_expected.to define_string_prop(:color)
      .with_default("data_1")
  }

  it { is_expected.to define_string_prop(:prefix_text) }
  it { is_expected.to define_string_prop(:text) }

  describe "#body_color" do
    it "returns correct body color class name", :aggregate_failures do
      expect(subject.new(color: "data_3", text: "Text").body_color).to eq "light"
      expect(subject.new(color: "data_3", dark: true, text: "Text").body_color).to eq "lighter"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(text: "Test default").classname).to eq "pb_legend_kit_data_1"
      expect(subject.new(color: "data_5", dark: true, text: "Text").classname).to eq "pb_legend_kit_data_5 dark"
      expect(subject.new(color: "success", text: "Test").classname).to eq "pb_legend_kit_success"
    end
  end
end
