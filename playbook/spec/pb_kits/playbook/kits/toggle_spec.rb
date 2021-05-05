# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_toggle/toggle"

RSpec.describe Playbook::PbToggle::Toggle do
  subject { Playbook::PbToggle::Toggle }

  it {
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("sm", "md")
  }
  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_hash_prop(:input_options).with_default({}) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_toggle_kit_sm_off"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_toggle_kit_sm_off additional_class"
      expect(subject.new(size: "md").classname).to eq "pb_toggle_kit_md_off"
      expect(subject.new(checked: true).classname).to eq "pb_toggle_kit_sm_on"
    end
  end
end
