# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_radio/radio"

RSpec.describe Playbook::PbRadio::Radio do
  subject { Playbook::PbRadio::Radio }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:checked).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:error).with_default(false) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:value) }


    describe "#classname" do
      it "returns namespaced class name", :aggregate_failures do
        expect(subject.new({}).classname).to eq "pb_radio_kit"
        expect(subject.new(dark: true).classname).to eq "pb_radio_kit_dark dark"
        expect(subject.new(checked: true).classname).to eq "pb_radio_kit"
        expect(subject.new(dark: true, checked: true).classname).to eq "pb_radio_kit_dark dark"
        expect(subject.new(checked: false, error: true).classname).to eq "pb_radio_kit error"
        expect(subject.new(checked: false, dark: true, error: true).classname).to eq "pb_radio_kit_dark error"
    end
  end
end
