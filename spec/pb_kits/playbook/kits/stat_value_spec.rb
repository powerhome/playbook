# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_stat_value/stat_value"

RSpec.describe Playbook::PbStatValue::StatValue do
  subject { Playbook::PbStatValue::StatValue }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:unit) }
  it { is_expected.to define_prop(:value)
                  .of_type(Playbook::Props::Number) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_stat_value_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_stat_value_kit additional_class"
    end
  end
end
