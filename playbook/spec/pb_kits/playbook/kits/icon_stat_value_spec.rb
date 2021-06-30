# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon_stat_value/icon_stat_value"

RSpec.describe Playbook::PbIconStatValue::IconStatValue do
  subject { Playbook::PbIconStatValue::IconStatValue }

  it { is_expected.to define_prop(:icon).that_is_required }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("sm", "md", "lg")
  }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("default")
      .with_values("default", "royal", "blue", "purple", "teal", "red", "yellow", "green")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "rocket"
      expect(subject.new(icon: icon).classname).to eq "pb_icon_stat_value_kit_horizontal_sm_default"
      expect(subject.new(icon: icon, orientation: "vertical", size: "lg", variant: "royal").classname).to eq "pb_icon_stat_value_kit_vertical_lg_royal"
      expect(subject.new(icon: icon, variant: "purple", size: "lg").classname).to eq "pb_icon_stat_value_kit_horizontal_lg_purple"
    end
  end
end
