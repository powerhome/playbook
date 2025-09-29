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
      .with_values("default", "royal", "blue", "purple", "teal", "red", "yellow", "green", "orange")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "rocket"
      expect(subject.new(icon: icon).classname).to eq "pb_icon_stat_value_kit_horizontal"
      expect(subject.new(icon: icon, orientation: "vertical", size: "lg", variant: "royal").classname).to eq "pb_icon_stat_value_kit_vertical"
    end
  end

  describe "size prop rendering" do
    it "renders different title sizes based on size prop" do
      icon = "lightbulb-on"

      expect(subject.new(icon: icon, size: "sm").title_size).to eq 3
      expect(subject.new(icon: icon, size: "md").title_size).to eq 2
      expect(subject.new(icon: icon, size: "lg").title_size).to eq 1
    end
  end

  describe "variant prop rendering" do
    it "passes correct variant to icon_circle component" do
      icon = "lightbulb-on"
      variants = %w[default royal blue purple teal red yellow green orange]

      variants.each do |variant|
        component = subject.new(icon: icon, variant: variant)
        expect(component.variant).to eq variant
        expect(component.icon).to eq icon
        expect(component.size).to eq "sm"
      end
    end

    it "passes correct variant with different sizes" do
      icon = "lightbulb-on"
      variant = "royal"
      sizes = %w[sm md lg]

      sizes.each do |size|
        component = subject.new(icon: icon, variant: variant, size: size)
        expect(component.variant).to eq variant
        expect(component.size).to eq size
      end
    end
  end
end
