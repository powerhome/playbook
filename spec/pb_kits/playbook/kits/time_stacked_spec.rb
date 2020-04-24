# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time_stacked/time_stacked"

RSpec.describe Playbook::PbTimeStacked::TimeStacked do
  subject { Playbook::PbTimeStacked::TimeStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:date)
                      .of_type(Playbook::Props::Date)
                      .that_is_required }
  it { is_expected.to define_prop(:classnames)
                      .of_type(Playbook::Props::String)
                      .with_default(nil) }
  it { is_expected.to define_enum_prop(:tag)
                      .with_values("body", "caption") }

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

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      date = Date.today

      expect(subject.new(date: date).classname).to eq "pb_time_stacked_kit"
      expect(subject.new(date: date, dark: true).classname).to include "_dark"
    end
  end

  describe "#tag_classnames" do
    it "returns class name with tag", :aggregate_failures do
      date = Date.new(2020, 04, 06)

      expect(subject.new(date: date).tag_classnames).to eq "pb_time_stacked_kit_body"
      expect(subject.new(date: date, tag: "caption").tag_classnames).to eq "pb_time_stacked_kit_caption"
    end
  end

  describe "#format_time_string" do
    it "returns a formatted string" do
      time = Date.new(2020, 04, 06)
      result = "#{time.strftime("%I:%M")}#{time.strftime("%P")[0, 1]}"

      expect(subject.new(date: time).format_time_string).to eq result
    end
  end

  describe "#format_timezone" do
    it "returns a formatted timezone" do
      expect(subject.new(date: DateTime.current).format_timezone).to eq "EDT"
    end
  end
end
