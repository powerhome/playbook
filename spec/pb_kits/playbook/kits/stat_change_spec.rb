# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_stat_change/stat_change"

RSpec.describe Playbook::PbStatChange::StatChange do
  subject { Playbook::PbStatChange::StatChange }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:value).of_type(Playbook::Props::Percentage) }
  it { is_expected.to define_enum_prop(:change)
                   .with_default("neutral")
                   .with_values("neutral", "increase", "decrease")}

    describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_stat_change_kit_neutral"
      expect(subject.new(change: "decrease").classname).to eq "pb_stat_change_kit_negative"
    end
  end
end
