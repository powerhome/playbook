# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_selectable_card_icon/selectable_card_icon"

RSpec.describe Playbook::PbSelectableCardIcon::SelectableCardIcon do
  subject { Playbook::PbSelectableCardIcon::SelectableCardIcon }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:multi).with_default(true) }
  it { is_expected.to define_boolean_prop(:checkmark).with_default(false) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:icon) }
  it { is_expected.to define_prop(:title_text) }
  it { is_expected.to define_prop(:body_text) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:input_id) }
  it { is_expected.to define_hash_prop(:additional_input_options).with_default({}) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_selectable_card_icon_kit_enabled"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_selectable_card_icon_kit_enabled additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_selectable_card_icon_kit_enabled dark"
      expect(subject.new(disabled: true).classname).to eq "pb_selectable_card_icon_kit_disabled"
    end
  end
end
