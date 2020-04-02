# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_label_value/label_value"

RSpec.describe Playbook::PbLabelValue::LabelValue do
  subject { Playbook::PbLabelValue::LabelValue }

  it { is_expected.to define_partial }
  it { is_expected.to define_string_prop(:label).that_is_required }
  it { is_expected.to define_string_prop(:value).that_is_required }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      label = "Label!"
      value = "Value!"
      expect(subject.new(label: label, value: value).classname).to eq "pb_label_value_kit"
      expect(subject.new(label: label, value: value, dark: true).classname).to eq "pb_label_value_kit_dark"
      expect(subject.new(label: label, value: value, classname: "additional_class").classname).to eq "pb_label_value_kit additional_class"
      expect(subject.new(label: label, value: value, classname: "additional_class", dark: true).classname).to eq "pb_label_value_kit_dark additional_class"
    end
  end
end
