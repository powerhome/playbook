# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time_stacked/time_stacked"

RSpec.describe Playbook::PbTimeStacked::TimeStacked do
  subject { Playbook::PbTimeStacked::TimeStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right") }
  it { is_expected.to define_prop(:date)
                      .of_type(Playbook::Props::Time)
                      .that_is_required }
  it { is_expected.to define_prop(:classnames)
                      .of_type(Playbook::Props::String)
                      .with_default(nil) }

  describe "#month" do
    it "returns the date prop's month and month as a string" do
      expect(subject.new(date: DateTime.current).month).to include DateTime.current.month.to_s
    end
  end

  describe "#day" do
    it "returns the date prop's day and month as a string" do
      expect(subject.new(date: DateTime.current).day).to include DateTime.current.day.to_s
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      date = DateTime.new(2020, 04, 06).in_time_zone("America/New_York")

      expect(subject.new(date: date).classname).to eq "pb_time_stacked_kit_left"
      expect(subject.new(date: date, dark: true).classname).to include "_dark"

    end
  end

  describe "#format_time_string" do
    it "returns a formatted string" do
      time = DateTime.new(2020, 04, 06, 10, 0, 0).in_time_zone("America/New_York")
      result = "#{time.strftime("%I:%M")}#{time.strftime("%P")[0, 1]}"

      expect(subject.new(date: time).format_time_string).to eq result
    end
  end

  describe "#format_timezone" do
    it "returns a formatted timezone" do
      date = DateTime.new(2020, 04, 06, 10, 0, 0).in_time_zone("America/New_York")

      expect(subject.new(date: date).format_timezone).to eq "EDT"
    end
  end
end
