# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon_circle/icon_circle"

RSpec.describe Playbook::PbIconCircle::IconCircle do
  subject { Playbook::PbIconCircle::IconCircle }

  it { is_expected.to define_prop(:icon).that_is_required }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default("md")
      .with_values("xxs", "xs", "sm", "md", "base", "lg", "xl")
  }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("default")
      .with_values("default", "royal", "blue", "orange", "purple", "teal", "red", "yellow", "green", "orange", "lighter")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "user"
      expect(subject.new(icon: icon, variant: "royal").classname).to eq "pb_icon_circle_kit_size_md_royal"
      expect(subject.new(icon: icon, size: "sm").classname).to eq "pb_icon_circle_kit_size_sm_default"
      expect(subject.new(icon: icon, size: "sm", dark: true).classname).to eq "pb_icon_circle_kit_size_sm_default dark"
      expect(subject.new(icon: icon, variant: "purple", size: "lg").classname).to eq "pb_icon_circle_kit_size_lg_purple"
      expect(subject.new(icon: icon, classname: "additional_class").classname).to eq "pb_icon_circle_kit_size_md_default additional_class"
    end

    it "raises an error when not given an icon" do
      expect { subject.new({}) }.to raise_error(Playbook::Props::Error)
    end
  end
end
