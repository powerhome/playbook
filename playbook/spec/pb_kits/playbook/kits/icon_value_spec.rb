# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_icon_value/icon_value"

RSpec.describe Playbook::PbIconValue::IconValue do
  subject { Playbook::PbIconValue::IconValue }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:icon).that_is_required }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_enum_prop(:align)
                  .with_default("left")
                  .with_values("left", "center", "right") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { icon: "user", text: "test" }

      expect(subject.new(required_props).classname).to eq "pb_icon_value_kit_left"
      expect(subject.new(required_props.merge(align: "center")).classname).to eq "pb_icon_value_kit_center"
      expect(subject.new(required_props.merge(align: "center", dark: true)).classname).to eq "pb_icon_value_kit_center dark"
      expect(subject.new(required_props.merge(classname: "additional_class")).classname).to eq "pb_icon_value_kit_left additional_class"
    end

    it "raises an error when not given an icon" do
      expect { subject.new(text: "test") }.to raise_error(Playbook::Props::Error)
    end

    it "raises an error when not given text" do
      expect { subject.new(icon: "user") }.to raise_error(Playbook::Props::Error)
    end
  end
end
