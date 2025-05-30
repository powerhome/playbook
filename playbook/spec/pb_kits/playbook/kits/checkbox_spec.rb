# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_checkbox/checkbox"

RSpec.describe Playbook::PbCheckbox::Checkbox do
  subject { Playbook::PbCheckbox::Checkbox }

  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:error).with_default(false) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_boolean_prop(:form_spacing).with_default(false) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_boolean_prop(:indeterminate_main).with_default(false) }
  it { is_expected.to define_prop(:indeterminate_parent) }
  it { is_expected.to define_hash_prop(:input_options).with_default({}) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_checkbox_kit_off"
      expect(subject.new(dark: true).classname).to eq "pb_checkbox_kit_off dark"
      expect(subject.new(checked: true).classname).to eq "pb_checkbox_kit_on"
      expect(subject.new(dark: true, checked: true).classname).to eq "pb_checkbox_kit_on dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_checkbox_kit_off additional_class"
      expect(subject.new(error: true).classname).to eq "pb_checkbox_kit_off error"
      expect(subject.new(dark: true, error: true).classname).to eq "pb_checkbox_kit_off dark error"
      expect(subject.new(disabled: true).disabled).to eq true
    end
  end
end
