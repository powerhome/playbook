# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_currency/currency"

RSpec.describe Playbook::PbCurrency::Currency do
  subject { Playbook::PbCurrency::Currency }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align).with_default("left").with_values("left", "center", "right") }
  it { is_expected.to define_prop(:amount).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:label).with_default("").of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:unit).of_type(Playbook::Props::String) }
  it { is_expected.to define_enum_prop(:size).with_default("sm").with_values("lg", "sm") }
  it { is_expected.to define_prop(:symbol).with_default("$").of_type(Playbook::Props::String) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(amount: "2000").classname).to eq "pb_currency_kit_left"
      expect(subject.new(amount: "2000", align: "center").classname).to eq "pb_currency_kit_center"
      expect(subject.new(amount: "2000", align: "right").classname).to eq "pb_currency_kit_right"
      expect(subject.new(amount: "2000", classname: "additional_class").classname).to eq "pb_currency_kit_left additional_class"
    end
  end
end
