# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_selectable_card/selectable_card"

RSpec.describe Playbook::PbSelectableCard::SelectableCard do
  subject { Playbook::PbSelectableCard::SelectableCard }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:icon).with_default(false) }
  it { is_expected.to define_boolean_prop(:multi).with_default(true) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:value) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_selectable_card_kit_enabled"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_selectable_card_kit_enabled additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_selectable_card_kit_enabled dark"
      expect(subject.new(disabled: true).classname).to eq "pb_selectable_card_kit_disabled"
    end
  end
end