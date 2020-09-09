# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon_stat_value/icon_stat_value"

RSpec.describe Playbook::PbIconStatValue::IconStatValue do
  subject { Playbook::PbIconStatValue::IconStatValue }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:size)
                      .with_default("sm")
                      .with_values("sm", "lg") }
  it { is_expected.to define_enum_prop(:variant)
                      .with_default("default")
                      .with_values("default", "royal", "blue", "purple", "teal", "red", "yellow", "green") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_icon_stat_value_kit_horizontal_sm_default"
      expect(subject.new(orientation: "vertical", size:"lg", variant: "royal").classname).to eq "pb_icon_stat_value_kit_vertical_lg_royal"
    end
  end
end
