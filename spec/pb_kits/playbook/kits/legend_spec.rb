# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_legend/legend"

RSpec.describe Playbook::PbLegend::Legend do
  subject { Playbook::PbLegend::Legend }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:color)
                      .with_default("data_1")
                      .with_values("data_1", "data_2", "data_3", "data_4", "data_5", "data_6", "data_7") }

  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }

  it { is_expected.to define_string_prop(:prefix_text) }
  it { is_expected.to define_string_prop(:text) }

  describe "#body_color" do
    it "returns correct body color class name", :aggregate_failures do
      expect(subject.new(color: 'data_3', text: "Text").body_color).to eq "light"
      expect(subject.new(color: 'data_3', dark: true, text: "Text").body_color).to eq "lighter"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      color = "data_1"
      expect(subject.new(color: color, text: "Text").classname).to eq "pb_legend_kit_data_1_light"
      expect(subject.new(color: color, dark: true, text: "Text").classname).to eq "pb_legend_kit_data_1_dark"
    end
  end
end
