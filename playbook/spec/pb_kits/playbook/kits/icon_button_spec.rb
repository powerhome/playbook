# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon_button/icon_button"

RSpec.describe Playbook::PbIconButton::IconButton do
  subject { Playbook::PbIconButton::IconButton }

  # Test prop definitions
  it { is_expected.to define_prop(:icon).with_default("bars") }
  it { is_expected.to define_prop(:link) }
  it { is_expected.to define_boolean_prop(:new_window).with_default(false) }
  it {
    is_expected.to define_enum_prop(:type)
      .with_default("button")
      .with_values("button", "submit", "reset")
  }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("default")
      .with_values("default", "link")
  }

  # Test classname generation
  describe "#classname" do
    it "returns the correct namespaced class name", :aggregate_failures do
      expect(subject.new(variant: "default").classname).to eq "pb_icon_button_kit_default"
      expect(subject.new(variant: "link").classname).to eq "pb_icon_button_kit_link"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_icon_button_kit_default additional_class"
    end

    it "raises an error when given an invalid variant" do
      expect { subject.new(variant: "invalid_variant") }.to raise_error(Playbook::Props::Error)
    end
  end

  # Test rendering behavior
  describe "rendering" do
    let(:icon) { "bars" }

    it "renders the default variant with icon" do
      result = subject.new(icon: icon).classname
      expect(result).to eq "pb_icon_button_kit_default"
    end

    it "renders the link variant" do
      result = subject.new(icon: icon, variant: "link").classname
      expect(result).to eq "pb_icon_button_kit_link"
    end

    it "renders a button with type submit" do
      result = subject.new(icon: icon, type: "submit").classname
      expect(result).to include "pb_icon_button_kit_default"
    end

    it "renders with custom classname" do
      result = subject.new(icon: icon, classname: "extra_class").classname
      expect(result).to eq "pb_icon_button_kit_default extra_class"
    end
  end
end
