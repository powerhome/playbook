# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_selectable_icon/selectable_icon"

RSpec.describe Playbook::PbSelectableIcon::SelectableIcon do
  subject { Playbook::PbSelectableIcon::SelectableIcon }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:multi).with_default(true) }
  it { is_expected.to define_prop(:inputs).with_default("enabled") }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:icon) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:input_id) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_selectable_icon_kit_enabled"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_selectable_icon_kit_enabled additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_selectable_icon_kit_dark_enabled dark"
      expect(subject.new(disabled: true).classname).to eq "pb_selectable_icon_kit_disabled"
    end
  end
end
