# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_stacked/date_stacked"

RSpec.describe Playbook::PbDateStacked::DateStacked do
  subject { Playbook::PbDateStacked::DateStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right") }
  it { is_expected.to define_enum_prop(:size)
                      .with_values("sm", "md") }
  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:reverse)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:date)
                      .of_type(Playbook::Props::Date)
                      .that_is_required }

  describe "#month" do
    it "returns the date prop's month and month as a string" do
      expect(subject.new(date: Date.today).month).to include Date.today.month.to_s
    end
  end

  describe "#day" do
    it "returns the date prop's day and month as a string" do
      expect(subject.new(date: Date.today).day).to include Date.today.day.to_s
    end
  end

  describe "#year" do
    it "returns the date prop's year as a string if date prop's year is not current year" do
      if subject.new(date: Date.today).year != subject.new(date: Date.new(2018, 10, 19)).year
        expect(subject.new(date: Date.new(2018, 10, 19)).year).to include "2018"
      end
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      date = Date.today
      align = "left"
      size = "sm"

      expect(subject.new(date: date).classname).to eq "pb_date_stacked_kit_left_sm"
      expect(subject.new(date: date, size: size).classname).to eq "pb_date_stacked_kit_left_#{size}"
      expect(subject.new(date: date, align: align).classname).to eq "pb_date_stacked_kit_#{align}_sm"
      expect(subject.new(date: date, reverse: true).classname).to include "_reverse"
      expect(subject.new(date: date, dark: true).classname).to include "_dark"

    end
  end
end
