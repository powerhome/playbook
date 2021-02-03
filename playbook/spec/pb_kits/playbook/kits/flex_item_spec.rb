# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_flex/flex_item"

RSpec.describe Playbook::PbFlex::FlexItem do
  subject { Playbook::PbFlex::FlexItem }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:flex)
                      .with_default("none")
                      .with_values("0","1","2","3","4","5","6","7","8","9","10","11","12","none") }
  it { is_expected.to define_enum_prop(:overflow)
                      .with_default(nil)
                      .with_values("auto","hidden", "initial", "inherit", "scroll", "visible", nil) }
  it { is_expected.to define_boolean_prop(:shrink).with_default(false) }
  it { is_expected.to define_boolean_prop(:grow).with_default(false) }
  it { is_expected.to define_string_prop(:fixed_size)}
   describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_flex_item_kit"
      expect(subject.new(grow: true).classname).to eq "pb_flex_item_kit_grow"
      expect(subject.new(shrink: true).classname).to eq "pb_flex_item_kit_shrink"
      expect(subject.new(flex: "1").classname).to eq "pb_flex_item_kit_flex_1"
      expect(subject.new(fixed_size: "250px").classname).to eq "pb_flex_item_kit_fixed_size"
      expect(subject.new(overflow: "hidden").classname).to eq "pb_flex_item_kit overflow_hidden"
    end
  end

end
