# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_checkbox/checkbox"

module Playbook
  module PbCheckbox
    describe Checkbox do
      subject { Checkbox }

      it { is_expected.to define_prop(:dark).of_type(Props::Boolean).with_default(false) }
      it { is_expected.to define_prop(:text).with_default("") }
      it { is_expected.to define_prop(:value).with_default("") }
      it { is_expected.to define_prop(:name).with_default("") }
      it { is_expected.to define_prop(:checked).of_type(Props::Boolean).with_default(false) }
      it { is_expected.to define_prop(:icon) }

      describe "#classname" do
        it "returns namespaced class name", :aggregate_failures do
          expect(Checkbox.new({}).classname).to eq "pb_checkbox_kit_off"
          expect(Checkbox.new(dark: true).classname).to eq "pb_checkbox_kit_dark_off"
          expect(Checkbox.new(checked: true).classname).to eq "pb_checkbox_kit_on"
          expect(Checkbox.new(dark: true, checked: true).classname).to eq "pb_checkbox_kit_dark_on"
          expect(Checkbox.new(classname: "additional_class").classname).to eq "pb_checkbox_kit_off additional_class"
        end
      end
    end
  end
end
