# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_stat_value/stat_value"

RSpec.describe Playbook::PbStatValue::StatValue do
  subject { Playbook::PbStatValue::StatValue }

  it { is_expected.to define_prop(:unit) }
  it {
    is_expected.to define_prop(:value)
      .of_type(Playbook::Props::Numeric)
  }
  it {
    is_expected.to define_prop(:precision)
      .of_type(Playbook::Props::Numeric)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_stat_value_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_stat_value_kit additional_class"
    end
  end

  describe "when props are filled" do
    it "shows a unit" do
      stat_value = subject.new(value: 1842.3, unit: "monkeys")

      expect(stat_value.value).to eq 1842.3
      expect(stat_value.unit).to eq "monkeys"
    end

    it "uses precision" do
      stat_value = subject.new(value: 1842, precision: 3)

      expect(stat_value.value).to eq 1842.000
      expect(stat_value.precision).to eq 3
    end
  end
end
