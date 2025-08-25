# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_stacked/date_stacked"

RSpec.describe Playbook::PbDateStacked::DateStacked do
  subject { Playbook::PbDateStacked::DateStacked }

  it {
    is_expected.to define_enum_prop(:align)
      .with_values("left", "center", "right")
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_values("sm", "md")
  }
  it {
    is_expected.to define_prop(:dark)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:reverse)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:date)
      .of_type(Playbook::Props::Date)
      .that_is_required
  }
  it {
    is_expected.to define_prop(:bold)
      .of_type(Playbook::Props::Boolean)
  }

  describe "#month" do
    it "displays the month" do
      expect(subject.new(date: Date.new(2019, 10, 19)).month).to eq("Oct")
    end
  end

  describe "#day" do
    it "returns the date prop's day and month as a string" do
      expect(subject.new(date: Date.today).day).to include Date.today.day.to_s
    end
  end

  describe "#year" do
    it "returns the date prop's year as a string if date prop's year is not current year" do
      expect(subject.new(date: Date.new(2018, 10, 19)).year).to include "2018" if subject.new(date: Date.today).year != subject.new(date: Date.new(2018, 10, 19)).year
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      date = Date.today

      expect(subject.new(date: date).classname).to eq "pb_date_stacked_kit_left_sm"
      expect(subject.new(date: date, size: "md").classname).to eq "pb_date_stacked_kit_left_md"
      expect(subject.new(date: date, align: "center").classname).to eq "pb_date_stacked_kit_center_sm"
      expect(subject.new(date: date, reverse: true).classname).to eq "pb_date_stacked_kit_left_sm_reverse"
      expect(subject.new(date: date, dark: true).classname).to eq "pb_date_stacked_kit_left_sm_dark dark"
      expect(subject.new(date: date, dark: true, reverse: true).classname).to eq "pb_date_stacked_kit_left_sm_reverse_dark dark"
    end
  end
end
