# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_range_stacked/date_range_stacked"

RSpec.describe Playbook::PbDateRangeStacked::DateRangeStacked do
  subject { Playbook::PbDateRangeStacked::DateRangeStacked }
  let(:date_range_stacked) { subject.new(start_date: Date.today, end_date: Date.today) }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:dark)
    .with_default(false) }

  it { is_expected.to define_prop(:start_date).of_type(Playbook::Props::Date)
    .that_is_required }
   
  it { is_expected.to define_prop(:end_date).of_type(Playbook::Props::Date)
    .that_is_required }

  describe "#year" do
    it "returns the date prop's year as a string" do
      expect(date_range_stacked.year(date_range_stacked.start_date)).to eq Date.today.year.to_s
    end
  end

  describe "#day_month" do
    it "returns the date prop's day and month as a string" do
      expect(date_range_stacked.day_month(date_range_stacked.start_date)).to eq Date.today.strftime("%-d") + " " + Date.today.strftime("%^b")
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(date_range_stacked.classname).to eq "pb_date_range_stacked"
      expect(subject.new(start_date: Date.today,
                         end_date: Date.today,
                         classname: "additional_class").classname).to eq "pb_date_range_stacked additional_class"
    end
  end
end
