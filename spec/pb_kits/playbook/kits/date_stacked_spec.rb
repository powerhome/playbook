# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_stacked/date_stacked"

RSpec.describe Playbook::PbDateStacked::DateStacked do
  subject { Playbook::PbDateStacked::DateStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right")
                      .with_default "left" }
  it { is_expected.to define_enum_prop(:size)
                      .with_values("sm", "md")
                      .with_default "sm" }
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default false }
  it { is_expected.to define_boolean_prop(:reverse)
                      .with_default false }
                      it { is_expected.to define_prop(:date) }


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
        expect(subject.new(date: Date.new(2018, 10, 19).year)).to include "2018"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_date_stacked_left_sm"
      expect(subject.new(align: "right").classname).to eq "pb_date_stacked_right_sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_date_stacked_left_sm additional_class"
    end
  end
end
