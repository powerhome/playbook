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
  it { is_expected.to define_enum_prop(:decimals).with_default("default").with_values("default", "matching") }
  it { is_expected.to define_prop(:comma_separator).with_default(false).of_type(Playbook::Props::Boolean) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(amount: "2000").classname).to eq "pb_currency_kit_left_md"
      expect(subject.new(amount: "2000", align: "center").classname).to eq "pb_currency_kit_center_md"
      expect(subject.new(amount: "2000", align: "right").classname).to eq "pb_currency_kit_right_md"
      expect(subject.new(amount: "2000", classname: "additional_class").classname).to eq "pb_currency_kit_left_md additional_class"
    end
  end

  describe "when prop abbreviate is set to true" do
    it "renders proper abbreviated amount for number in the thousands" do
      num = subject.new(abbreviate: true, amount: "3200")

      expect(num.title_props[:text]).to eq "3.2"
      expect(num.body_props[:text]).to eq "K"
    end
    it "renders proper abbreviated amount for number in the millions" do
      num = subject.new(abbreviate: true, amount: "3,200,000")

      expect(num.title_props[:text]).to eq "3.2"
      expect(num.body_props[:text]).to eq "M"
    end
    it "renders proper abbreviated amount for number in the billions" do
      num = subject.new(abbreviate: true, amount: "3,200,000,000")

      expect(num.title_props[:text]).to eq "3.2"
      expect(num.body_props[:text]).to eq "B"
    end
    it "renders proper abbreviated amount for number in the trillions" do
      num = subject.new(abbreviate: true, amount: "3,200,000,000,000")

      expect(num.title_props[:text]).to eq "3.2"
      expect(num.body_props[:text]).to eq "T"
    end
    it "renders proper abbreviated amount when a unit is passed to the kit" do
      num = subject.new(abbreviate: true, amount: "3,200", unit: "/yr")

      expect(num.title_props[:text]).to eq "3.2"
      expect(num.body_props[:text]).to eq "K/yr"
    end
  end

  describe "when prop decimals is set to matching" do
    it "renders decimals as title text" do
      num = subject.new(decimals: "matching", amount: "320.20")

      expect(num.title_props[:text]).to eq "320.20"
      expect(num.body_props[:text]).to be_empty
    end
  end

  describe "when prop decimals is set to default" do
    it "renders decimals as body text" do
      num = subject.new(decimals: "default", amount: "320.20")

      expect(num.title_props[:text]).to eq "320"
      expect(num.body_props[:text]).to eq ".20"
    end
  end

  describe "when prop commaSeparator is set to true" do
    it "returns comma separated amount" do
      num = subject.new(comma_separator: true, amount: "1234567890")

      expect(num.title_props[:text]).to eq "1,234,567,890"
    end
  end

  describe "when given a negative value" do
    it "show negative sign to the left of currency sign with small variant" do
      num = subject.new(amount: "-123.45", size: "sm")

      expect(num.negative_sign).to eq "-"
      expect(num.title_props[:text]).to eq "123"
    end

    it "show negative sign to the right of currency sign with medium, large, and no sign variants" do
      md_num = subject.new(amount: "-123.45", size: "md")

      expect(md_num.negative_sign).to eq ""
      expect(md_num.title_props[:text]).to eq "-123"

      lg_num = subject.new(amount: "-123.45", size: "lg")

      expect(lg_num.negative_sign).to eq ""
      expect(lg_num.title_props[:text]).to eq "-123"

      no_symbol_num = subject.new(amount: "-123.45", size: "sm", symbol: "")

      expect(no_symbol_num.negative_sign).to eq ""
      expect(no_symbol_num.title_props[:text]).to eq "-123"
    end
  end

  describe "when given a numeric value" do
    it "show correct amount with numeric value" do
      num = subject.new(amount: 32)

      expect(num.title_props[:text]).to eq "32"
    end

    it "show negative sign with numeric value" do
      num = subject.new(amount: -123)

      expect(num.title_props[:text]).to eq "-123"
    end

    it "show proper abbreviated amount with numeric value" do
      num = subject.new(abbreviate: true, amount: 3200)

      expect(num.title_props[:text]).to eq "3.2"
      expect(num.body_props[:text]).to eq "K"
    end

    it "show proper comma separated amount with numeric value" do
      num = subject.new(comma_separator: true, amount: 1234567890)

      expect(num.title_props[:text]).to eq "1,234,567,890"
    end

    it "show empty string when numeric amount is equal to 0" do
      num = subject.new(comma_separator: true, amount: 0.00)

      expect(num.title_props[:text]).to eq ""
      expect(num.body_props[:text]).to eq ".00"
    end
  end
end
