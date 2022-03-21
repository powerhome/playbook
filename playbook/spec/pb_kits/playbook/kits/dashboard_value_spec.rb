# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dashboard_value/dashboard_value"

RSpec.describe Playbook::PbDashboardValue::DashboardValue do
  subject { Playbook::PbDashboardValue::DashboardValue }

  it {
    is_expected.to define_enum_prop(:align)
      .with_values("left", "center", "right")
      .with_default("left")
  }
  it {
    is_expected.to define_prop(:stat_change)
      .of_type(Playbook::Props::Hash)
  }
  it { is_expected.to define_string_prop(:stat_label) }
  it {
    is_expected.to define_prop(:stat_value)
      .of_type(Playbook::Props::Hash)
  }

  describe "#sanitized_stat_value", :aggregate_failures do
    it "returns integers when fed integers or decimals that end in *.0" do
      expect(subject.new(stat_value: { value: 142 }).sanitized_stat_value).to eq 142
      expect(subject.new(stat_value: { value: 67.0 }).sanitized_stat_value).to eq 67
    end

    it "returns decimals when fed decimals" do
      expect(subject.new(stat_value: { value: 14.2 }).sanitized_stat_value).to eq 14.2
      expect(subject.new(stat_value: { value: 67.01 }).sanitized_stat_value).to eq 67.01
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_dashboard_value_kit_left"
      expect(subject.new(align: "right").classname).to eq "pb_dashboard_value_kit_right"
    end
  end
end
