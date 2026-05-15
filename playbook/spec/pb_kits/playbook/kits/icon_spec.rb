# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon/icon"

RSpec.describe Playbook::PbIcon::Icon do
  subject { Playbook::PbIcon::Icon }

  it {
    is_expected.to define_prop(:border)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:fixed_width)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_enum_prop(:flip)
      .with_values("horizontal", "vertical", "both", nil)
  }
  it { is_expected.to define_prop(:icon) }
  it {
    is_expected.to define_prop(:custom_icon)
      .of_type(Playbook::Props::String)
      .with_default(nil)
  }
  it {
    is_expected.to define_prop(:inverse)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:list_item)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_enum_prop(:pull)
      .with_values("left", "right", nil)
  }
  it {
    is_expected.to define_prop(:pulse)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_enum_prop(:rotation)
      .with_values(90, 180, 270, nil)
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_values("lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", nil)
  }
  it {
    is_expected.to define_prop(:spin)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:color)
      .of_type(Playbook::Props::String)
      .with_default(nil)
  }

  describe "#custom_icon" do
    it "returns an icon with custom data-collapsible-main attribute", :aggregate_failures do
      icon = "user.svg"
      data = { collapsible_main: true }
      id = "iconid"

      expect(subject.new(icon: icon, data: data).data).to eq({ collapsible_main: true })
      expect(subject.new(icon: icon, id: id).id).to eq("iconid")
    end
  end

  describe "#fa_fallback_data" do
    it "includes the fallback marker and icon name in test/debug environments" do
      icon = "not-a-playbook-icon"

      expect(subject.new(icon: icon).fa_fallback_data).to eq(
        {
          pb_icon_fa_fallback: true,
          pb_icon_fa_fallback_icon: icon,
        }
      )
    end

    it "can be enabled explicitly with PB_ICON_FA_FALLBACK_DEBUG" do
      allow(Rails.env).to receive(:production?).and_return(true)
      allow(Rails.env).to receive(:development?).and_return(false)
      allow(Rails.env).to receive(:test?).and_return(false)
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with("PB_ICON_FA_FALLBACK_DEBUG").and_return("true")

      expect(subject.new(icon: "debug-fallback-icon").fa_fallback_data).to include(
        pb_icon_fa_fallback_icon: "debug-fallback-icon"
      )
    end

    it "stays disabled in production unless debug is explicitly enabled" do
      allow(Rails.env).to receive(:production?).and_return(true)
      allow(Rails.env).to receive(:development?).and_return(false)
      allow(Rails.env).to receive(:test?).and_return(false)
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with("PB_ICON_FA_FALLBACK_DEBUG").and_return(nil)

      expect(subject.new(icon: "production-fallback-icon").fa_fallback_data).to eq({})
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "user"
      pull = "right"
      rotation = 90
      size = "sm"

      expect(subject.new(icon: icon).classname).to include("user")
      expect(subject.new(icon: icon, border: true, fixed_width: false).classname).to include("border")
      expect(subject.new(icon: icon, flip: "horizontal").classname).to include("horizontal")
      expect(subject.new(icon: icon, inverse: true).classname).to include("inverse")
      expect(subject.new(icon: icon, list_item: true).classname).to include("li")
      expect(subject.new(icon: icon, pull: pull).classname).to include("pull", pull)
      expect(subject.new(icon: icon, pulse: true).classname).to include("pulse")
      expect(subject.new(icon: icon, rotation: rotation).classname).to include("rotate", "90")
      expect(subject.new(icon: icon, size: size).classname).to include(size)
      expect(subject.new(icon: icon, spin: true).classname).to include("spin")
      expect(subject.new(icon: icon, classname: "additional_class").classname).to include("additional_class")
    end
    it "includes color class when color prop is provided", :aggregate_failures do
      icon = "user"
      color = "primary"

      expect(subject.new(icon: icon, color: color).classname).to include "color_primary"
    end
    it "does not include color class when color prop is not provided", :aggregate_failures do
      icon = "user"

      expect(subject.new(icon: icon).classname).not_to include "color_"
    end
  end
end
