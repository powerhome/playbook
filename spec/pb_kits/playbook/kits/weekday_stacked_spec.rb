# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_weekday_stacked/weekday_stacked"

RSpec.describe Playbook::PbWeekdayStacked::WeekdayStacked do
  subject { Playbook::PbWeekdayStacked::WeekdayStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }
  it { is_expected.to define_prop(:compact)
                      .with_default(false) }
  it { is_expected.to define_prop(:date)
                      .with_default(Date.current) }
  it { is_expected.to define_prop(:variant)
                      .with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_weekday_stacked_kit_left"
      expect(subject.new({align: "center"}).classname).to eq "pb_weekday_stacked_kit_center"
      expect(subject.new({align: "right"}).classname).to eq "pb_weekday_stacked_kit_right"
      expect(subject.new({dark: true}).classname).to eq "pb_weekday_stacked_kit_left"
    end
  end

  describe "date format methods" do
    it "returns the expected date formats", :aggregate_failures do
      expect(subject.new({date: Date.parse("2019/11/4")}).day_of_week).to eq '<time datetime="2019-11-04T00:00:00-05:00">Mon</time>'
      expect(subject.new({compact: true, date: Date.parse("2019/11/4")}).day_of_week).to eq '<time datetime="2019-11-04T00:00:00-05:00">M</time>'
      expect(subject.new({date: Date.parse("2019/11/4")}).formatted_month_and_day).to eq '<time datetime="2019-11-04T00:00:00-05:00">11/4</time>'
      expect(subject.new({date: Date.parse("2019/11/4"), variant: "expanded"}).formatted_month_and_day).to eq '<time datetime="2019-11-04T00:00:00-05:00">Nov 4</time>'
    end
  end
end
