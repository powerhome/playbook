# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timestamp/timestamp"
include ActionView::Helpers::DateHelper

RSpec.describe Playbook::PbTimestamp::Timestamp do
  subject { Playbook::PbTimestamp::Timestamp }
  let(:timestamp) { DateTime.new(2020, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze }
  let(:future_timestamp) { DateTime.new(2024, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right") }
  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:show_date)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_prop(:show_user)
                      .of_type(Playbook::Props::Boolean) }
  it { is_expected.to define_string_prop(:text) }
  it { is_expected.to define_prop(:timestamp)
                      .that_is_required }
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
    it "returns HH:MM with meridian" do
      timestamp = DateTime.new(2020, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
      expect(subject.new(timestamp: timestamp).format_time_string).to eq(" 4:30p")
    end
  end

  describe "#format_date_string" do
    it "returns date in specific format without year" do
      expect(subject.new(timestamp: timestamp).format_date_string).to eq("#{timestamp.strftime('%b %-d')}")
    end

    it "returns date in specific format with year" do
      expect(subject.new(timestamp: future_timestamp).format_date_string).to eq("#{future_timestamp.strftime('%b %-d, %Y')}")
    end
  end

  describe "#format_datetime_string" do
    it "returns date with time separated by middot" do
      expect(subject.new(timestamp: timestamp).format_datetime_string).to eq("Oct 10 &middot;  4:30p")
    end

    it "returns full date and time separated by middot" do
      expect(subject.new(timestamp: future_timestamp).format_datetime_string).to eq("Oct 10, 2024 &middot;  4:30p")
    end
  end

  describe "#format_updated_string" do
    let(:name) { "Maricris Nonato" }

    context "for variant updated" do
      let(:variant) { "updated" }

      context "if show_user is true" do
        let(:show_user) { true }
        it "returns last updated string including user's name" do
          timestamp = DateTime.new(2020, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
          date = "Oct 10"
          time = " 4:30p"

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user, text: name).format_updated_string).to eq("Last updated by #{name} on #{date} at #{time}")
        end

        it "returns last updated with year including user's name" do
          timestamp = DateTime.new(2024, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
          date = "Oct 10, 2024"
          time = " 4:30p"

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user, text: name).format_updated_string).to eq("Last updated by #{name} on #{date} at #{time}")
        end
      end

      context "if show_user is false" do
        let(:show_user) { false }
        it "returns last updated without user's name" do
          timestamp = DateTime.new(2020, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
          date = "Oct 10"
          time = " 4:30p"

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user).format_updated_string).to eq("Last updated on #{date} at #{time}")
        end

        it "returns last updated with year without user's name" do
          timestamp = DateTime.new(2024, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
          date = "Oct 10, 2024"
          time = " 4:30p"

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user).format_updated_string).to eq("Last updated on #{date} at #{time}")
        end
      end
    end

    context "for variant elapsed" do
      let(:variant) { "elapsed" }
      context "if show_user is true" do
        let(:show_user) { true }
        it "returns time elaspsed string including user's name" do
          timestamp = DateTime.new(2020, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
          date = "Oct 10"
          time = " 4:30p"

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user, text: name).format_updated_string).to eq("Last updated by #{name} #{time_ago_in_words(timestamp)} ago")
        end
      end

      context "if show_user is false" do
        let(:show_user) { false }
        it "returns time elaspsed string sans user's name" do
          timestamp = DateTime.new(2020, 10, 10, 20, 30, 00).in_time_zone("America/New_York").freeze
          date = "Oct 10"
          time = " 4:30p"

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user).format_updated_string).to eq("Last updated #{time_ago_in_words(timestamp)} ago")
        end
      end
    end
  end
end
