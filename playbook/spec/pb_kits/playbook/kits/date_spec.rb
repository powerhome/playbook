# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date/date"

RSpec.describe Playbook::PbDate::Date do
  subject { Playbook::PbDate::Date }

  it {
    is_expected.to define_enum_prop(:alignment)
      .with_values("left", "center", "right")
      .with_default("left")
  }
  it { is_expected.to define_prop(:date) }
  it {
    is_expected.to define_boolean_prop(:show_icon)
      .with_default(false)
  }
  it do
    is_expected.to define_enum_prop(:size)
      .with_default("md")
      .with_values("lg", "md", "sm", "xs")
  end
  it {
    is_expected.to define_boolean_prop(:show_day_of_week)
      .with_default(false)
  }
  it { is_expected.to define_prop(:timezone) }
  it {
    is_expected.to define_boolean_prop(:show_current_year)
      .with_default(false)
  }

  describe "#day_of_week" do
    it "displays the date" do
      expect(subject.new(
        date: Date.new(2019, 10, 31)
      ).day_of_week).to include "Thu"
    end
  end

  describe "#day" do
    it "displays the day" do
      expect(subject.new(
        date: Date.new(2020, 9, 15)
      ).day).to eq("15")
    end
  end

  describe "#month" do
    it "displays the month" do
      expect(subject.new(
        date: Date.new(2019, 10, 19)
      ).month).to eq("Oct")
    end
  end

  describe "#year" do
    it "displays the year" do
      expect(subject.new(
        date: Date.new(2019, 12, 19)
      ).year).to eq("2019")
    end
  end

  describe "#timezones" do
    it "displays the next day based on Timezone" do
      expect(subject.new(
        date: DateTime.new(2020, 12, 31, 16, 12, 12),
        timezone: "Australia/Sydney"
      ).day).to eq(" 1")
    end

    it "displays the next month based on Timezone" do
      expect(subject.new(
        date: DateTime.new(2019, 12, 31, 16, 12, 12),
        timezone: "Australia/Sydney"
      ).month).to eq("Jan")
    end

    it "displays the next year based on Timezone" do
      expect(subject.new(
        date: DateTime.new(2019, 12, 31, 16, 12, 12),
        timezone: "Australia/Sydney"
      ).year).to eq("2020")
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { date: Date.today }

      expect(subject.new(required_props).classname).to eq "pb_date_kit_left"
      expect(subject.new(required_props.merge(alignment: "center")).classname).to eq "pb_date_kit_center"
      expect(subject.new(required_props.merge(alignment: "right")).classname).to eq "pb_date_kit_right"
      expect(subject.new(required_props.merge(dark: true)).classname).to eq "pb_date_kit_left dark"
      expect(subject.new(required_props.merge(classname: "additional_class")).classname).to eq "pb_date_kit_left additional_class"
    end
  end
end
