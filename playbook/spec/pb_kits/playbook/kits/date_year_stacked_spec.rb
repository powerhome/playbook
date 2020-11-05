# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_year_stacked/date_year_stacked"

RSpec.describe Playbook::PbDateYearStacked::DateYearStacked do
  subject { Playbook::PbDateYearStacked::DateYearStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right")
                      .with_default "left" }
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default false }
  it { is_expected.to define_string_prop(:date) }

  describe "#year" do
    it "returns the date prop's year as a string" do
      expect(subject.new(date: Date.today).year).to eq Date.today.year.to_s
    end
  end

  describe "#day_month" do
    it "returns the date prop's day and month as a string" do
      expect(subject.new(date: Date.today).day_month).to eq Date.today.strftime("%-d") + " " + Date.today.strftime("%^b")
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_date_year_stacked_left"
      expect(subject.new(align: "right").classname).to eq "pb_date_year_stacked_right"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_date_year_stacked_left additional_class"
    end
  end
end
