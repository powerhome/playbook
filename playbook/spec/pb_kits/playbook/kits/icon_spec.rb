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

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "user"
      pull = "right"
      rotation = 90
      size = "sm"

      expect(subject.new(icon: icon, border: true, fixed_width: false).classname).to eq "pb_icon_kit far fa-user fa-border"
      expect(subject.new(icon: icon).classname).to eq "pb_icon_kit far fa-user fa-fw"
      expect(subject.new(icon: icon, flip: "horizontal").classname).to eq "pb_icon_kit far fa-user fa-fw fa-flip-horizontal"
      expect(subject.new(icon: icon).classname).to eq "pb_icon_kit far fa-user fa-fw"
      expect(subject.new(icon: icon, inverse: true).classname).to eq "pb_icon_kit far fa-user fa-fw fa-inverse"
      expect(subject.new(icon: icon, list_item: true).classname).to eq "pb_icon_kit far fa-user fa-fw fa-li"
      expect(subject.new(icon: icon, pull: pull).classname).to eq "pb_icon_kit far fa-user fa-fw fa-pull-#{pull}"
      expect(subject.new(icon: icon, pulse: true).classname).to eq "pb_icon_kit far fa-user fa-fw fa-pulse"
      expect(subject.new(icon: icon, rotation: rotation).classname).to eq "pb_icon_kit far fa-user fa-fw fa-rotate-#{rotation}"
      expect(subject.new(icon: icon, size: size).classname).to eq "pb_icon_kit far fa-user fa-fw fa-#{size}"
      expect(subject.new(icon: icon, spin: true).classname).to eq "pb_icon_kit far fa-user fa-fw fa-spin"
      expect(subject.new(icon: icon, classname: "additional_class").classname).to eq "pb_icon_kit far fa-user fa-fw additional_class"
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
