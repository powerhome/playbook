# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timestamp/timestamp"

RSpec.describe Playbook::PbTimestamp::Timestamp do
  subject { Playbook::PbTimestamp::Timestamp }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right") }
  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:show_date)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:show_user)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:timestamp)
                      .that_is_required }
  it { is_expected.to define_string_prop(:name) }
  it { is_expected.to define_enum_prop(:variant)
                      .with_values("default", "elapsed", "updated") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      timestamp = DateTime.current
      align = "left"
      dark = "dark"

      expect(subject.new(timestamp: timestamp).classname).to eq "pb_timestamp_kit_#{align}"
      expect(subject.new(variant: "updated", timestamp: timestamp).classname).to eq "pb_timestamp_kit_updated_#{align}"
      expect(subject.new(variant: "updated", dark: true, timestamp: timestamp).classname).to eq "pb_timestamp_kit_updated_left dark"
      expect(subject.new(variant: "elapsed", timestamp: timestamp).classname).to eq "pb_timestamp_kit_elapsed_#{align}"
      expect(subject.new(variant: "elapsed", dark: true, timestamp: timestamp).classname).to eq "pb_timestamp_kit_elapsed_#{align} dark"
      expect(subject.new(timestamp: timestamp, classname: "additional_class").classname).to eq "pb_timestamp_kit_left additional_class"
    end
  end

  describe "#format_year_string" do
    it "returns the year if timestamp not current year" do
      expect(subject.new(timestamp: DateTime.current + 4.years).format_year_string).to eq(", #{(DateTime.current + 4.years).year}")
    end

    it "returns nothing if timestamp is in year" do
      expect(subject.new(timestamp: DateTime.current).format_year_string).to eq("")
    end

  end

  describe "#format_time_string" do
  end

  xdescribe "#format_date_string" do
  end

  xdescribe "#format_datetime_string" do
  end

  xdescribe "#format_updated_string" do
  end
end
