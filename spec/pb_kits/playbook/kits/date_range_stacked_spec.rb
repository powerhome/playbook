# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_range_stacked/date_range_stacked"

RSpec.describe Playbook::PbDateRangeStacked::DateRangeStacked do
  subject { Playbook::PbDateRangeStacked::DateRangeStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:dark)
    .with_default(false) }

  it { is_expected.to define_prop(:start_date).of_type(Playbook::Props::Date)
    .that_is_required }
   
  it { is_expected.to define_prop(:end_date).of_type(Playbook::Props::Date)
    .that_is_required }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(start_date: Date.today, end_date: Date.today).classname).to eq "pb_date_range_stacked"
      expect(subject.new(start_date: Date.today,
                         end_date: Date.today,
                         classname: "additional_class").classname).to eq "pb_date_range_stacked additional_class"
    end
  end
end
