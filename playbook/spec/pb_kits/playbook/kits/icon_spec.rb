# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon/icon"

RSpec.describe Playbook::PbIcon::Icon do
  subject { Playbook::PbIcon::Icon }

  it { is_expected.to define_partial }


  it { is_expected.to define_prop(:border)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:fixed_width)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_enum_prop(:flip)
                      .with_values("horizontal", "vertical", "both", nil) }
  it { is_expected.to define_prop(:icon).that_is_required }
  it { is_expected.to define_prop(:inverse)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:list_item)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_enum_prop(:pull)
                      .with_values("left", "right", nil) }
  it { is_expected.to define_prop(:pulse)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_enum_prop(:rotation)
                      .with_values(90, 180, 270, nil) }
  it { is_expected.to define_enum_prop(:size)
                      .with_values("lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", nil) }
  it { is_expected.to define_prop(:spin)
                      .of_type(Playbook::Props::Boolean) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "user"
      pull ="right"
      rotation = 90
      size = "sm"

      expect(subject.new(icon: icon, border: true).classname).to eq "pb_icon_kit far fa-user fa-border"
      expect(subject.new(icon: icon, fixed_width: true).classname).to eq "pb_icon_kit far fa-user fa-fw"
      expect(subject.new(icon: icon, flip: "horizontal").classname).to eq "pb_icon_kit far fa-user fa-flip-horizontal"
      expect(subject.new(icon: icon,).classname).to eq "pb_icon_kit far fa-user"
      expect(subject.new(icon: icon, inverse: true).classname).to eq "pb_icon_kit far fa-user fa-inverse"
      expect(subject.new(icon: icon, list_item: true).classname).to eq "pb_icon_kit far fa-user fa-li"
      expect(subject.new(icon: icon, pull: pull).classname).to eq "pb_icon_kit far fa-user fa-pull-#{pull}"
      expect(subject.new(icon: icon, pulse: true).classname).to eq "pb_icon_kit far fa-user fa-pulse"
      expect(subject.new(icon: icon, rotation: rotation).classname).to eq "pb_icon_kit far fa-user fa-rotate-#{rotation}"
      expect(subject.new(icon: icon, size: size).classname).to eq "pb_icon_kit far fa-user fa-#{size}"
      expect(subject.new(icon: icon, spin: true).classname).to eq "pb_icon_kit far fa-user fa-spin"
      expect(subject.new(icon: icon, classname: "additional_class").classname).to eq "pb_icon_kit far fa-user additional_class"
    end

    it "raises an error when not given an icon" do
      expect { subject.new({}) }.to raise_error(Playbook::Props::Error)
    end
  end
end

