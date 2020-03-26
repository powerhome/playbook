# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_time/date_time"

RSpec.describe Playbook::PbDateTime::DateTime do
  subject { Playbook::PbDateTime::DateTime }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:timezone).with_default("America/New_York") }
  it { is_expected.to define_prop(:hide_week_day).with_default(false) }
  it { is_expected.to define_prop(:hide_clock_icon).with_default(false) }
  it { is_expected.to define_prop(:inline).with_default(true) }
  it { is_expected.to define_prop(:align).with_default("left") }
  it { is_expected.to define_prop(:dark).with_default(false) }

  describe "#format_date" do
    it "displays the date" do
      expect(subject.new(
        datetime: DateTime.new(2020, 3, 25, 12, 30, 0, "EDT")
      ).format_date).to include "Mar 25"
    end

    it "displays the week day by default" do
      expect(subject.new(
        datetime: DateTime.new(2020, 3, 25, 12, 30, 0, "EDT")
      ).format_date).to include "Wed"
    end

    it "does not display the week day when hide_week_day prop is true" do
      expect(subject.new(
        datetime: DateTime.new(2020, 3, 25, 12, 30, 0, "EDT"),
        hide_week_day: true
      ).format_date).to_not include "Wed"
    end
  end

  describe "#format_time" do
    it "displays the time" do
      expect(subject.new(
        datetime: DateTime.new(2020, 3, 25, 12, 30, 0, "EDT")
      ).format_time).to include "12:30p"
    end
  end
end
