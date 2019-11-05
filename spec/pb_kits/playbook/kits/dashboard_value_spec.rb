# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dashboard_value/dashboard_value"

RSpec.describe Playbook::PbDashboardValue::DashboardValue do
  subject { Playbook::PbDashboardValue::DashboardValue }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right")
                      .with_default("left") }
  it { is_expected.to define_prop(:stat_change)
                      .of_type(Playbook::Props::Hash) }
  it { is_expected.to define_prop(:stat_label)
                      .of_type(Playbook::Props::Hash) }
  it { is_expected.to define_prop(:stat_value)
                      .of_type(Playbook::Props::Hash) }

    describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_dashboard_value_kit_left"
      expect(subject.new(align: "right").classname).to eq "pb_dashboard_value_kit_right"
    end
  end
end
