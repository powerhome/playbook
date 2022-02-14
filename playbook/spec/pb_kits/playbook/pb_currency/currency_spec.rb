# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_currency/currency"

RSpec.describe Playbook::PbCurrency::Currency do
  subject { Playbook::PbCurrency::Currency }

  it { is_expected.to define_enum_prop(:align).with_default("left").with_values("left", "center", "right") }
  it { is_expected.to define_prop(:amount).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:emphasized).of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:label).with_default("").of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:unit).of_type(Playbook::Props::String) }
  it { is_expected.to define_enum_prop(:size).with_default("md").with_values("sm", "md", "lg") }
  it { is_expected.to define_prop(:symbol).with_default("$").of_type(Playbook::Props::String) }
  it { is_expected.to define_enum_prop(:variant).with_default("default").with_values("default", "light", "bold") }
  it { is_expected.to define_prop(:abbreviate).with_default(false).of_type(Playbook::Props::Boolean) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(amount: "2000").classname).to eq "pb_currency_kit_left_md"
      expect(subject.new(amount: "2000", align: "center").classname).to eq "pb_currency_kit_center_md"
      expect(subject.new(amount: "2000", align: "right").classname).to eq "pb_currency_kit_right_md"
      expect(subject.new(amount: "2000", classname: "additional_class").classname).to eq "pb_currency_kit_left_md additional_class"
    end
  end

  describe "when abbreviate prop is true" do
    it "renders proper abbreviated amount for number in the thousands" do
      num = subject.new(abbreviate: true, amount: "3200")

      expect(num).to eq "3.2K"
    end
    it "renders proper abbreviated amount for number in the millions" do
      num = subject.new(abbreviate: true, amount: "3,200,000")

      expect(num).to eq "3.2M"
    end
    it "renders proper abbreviated amount for number in the billions" do
      num = subject.new(abbreviate: true, amount: "3,200,000,000")

      expect(num).to eq "3.2B"
    end
    it "renders proper abbreviated amount for number in the trillions" do
      num = subject.new(abbreviate: true, amount: "3,200,000,000,000")

      expect(num).to eq "3.2T"
    end
    it "renders proper abbreviated amount when a unit is passed to the kit" do
      num = subject.new(abbreviate: true, amount: "3,200", unit: "/yr")

      expect(num).to eq "3.2K/yr"
    end
  end
end
