# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timestamp/timestamp"

RSpec.describe Playbook::PbTimestamp::Timestamp do
  include ActionView::Helpers::DateHelper

  subject { Playbook::PbTimestamp::Timestamp }
  let(:timestamp) { DateTime.new(2020, 10, 10, 20, 30, 0o0).in_time_zone("America/New_York").freeze }
  let(:future_timestamp) { (DateTime.current + 4.years).in_time_zone("America/New_York").freeze }
  let(:dynamic_future_timestamp) do
    future_year = DateTime.current.year + 4
    DateTime.new(future_year, 10, 10, 20, 30, 0, "America/New_York").in_time_zone("America/New_York").freeze
  end

  it {
    is_expected.to define_enum_prop(:align)
      .with_values("left", "center", "right")
  }
  it {
    is_expected.to define_prop(:dark)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:show_date)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:show_timezone)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:show_user)
      .of_type(Playbook::Props::Boolean)
  }
  it { is_expected.to define_string_prop(:text) }
  it { is_expected.to define_string_prop(:timezone) }
  it { is_expected.to define_prop(:timestamp) }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_values("default", "elapsed", "updated")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      timestamp = DateTime.current
      align = "left"

      expect(subject.new(timestamp: timestamp).classname).to eq "pb_timestamp_kit_#{align}"
      expect(subject.new(variant: "updated", timestamp: timestamp).classname).to eq "pb_timestamp_kit_#{align}"
      expect(subject.new(variant: "elapsed", timestamp: timestamp).classname).to eq "pb_timestamp_kit_#{align}"
      expect(subject.new(align: "center", timestamp: timestamp).classname).to eq "pb_timestamp_kit_center"
      expect(subject.new(align: "right", timestamp: timestamp).classname).to eq "pb_timestamp_kit_right"
    end
  end

  describe "#format_year_string" do
    it "returns the year if timestamp not current year" do
      expect(subject.new(timestamp: DateTime.current + 4.years).send(:format_year_string)).to eq(", #{(DateTime.current + 4.years).year}")
    end

    it "returns nothing if timestamp is in year" do
      expect(subject.new(timestamp: DateTime.current).send(:format_year_string)).to eq("")
    end
  end

  describe "#format_time_string" do
    it "returns HH:MM with meridian" do
      timestamp = DateTime.new(2020, 10, 10, 20, 30, 0o0).in_time_zone("America/New_York").freeze
      expect(subject.new(timestamp: timestamp).send(:format_time_string)).to eq("4:30p")
    end

    context "timezone" do
      it "returns timezone if present && show_timezone" do
        timestamp = DateTime.new(2020, 10, 10, 20, 30, 0o0).in_time_zone("America/New_York").freeze
        expect(subject.new(timestamp: timestamp, timezone: "America/New_York", show_timezone: true).send(:format_time_string)).to eq("4:30p EDT")
      end

      it "doesn't returns timezone if present && show_timezone is false" do
        timestamp = DateTime.new(2020, 10, 10, 20, 30, 0o0).in_time_zone("America/New_York").freeze
        expect(subject.new(timestamp: timestamp, timezone: "America/New_York", show_timezone: false).send(:format_time_string)).to eq("4:30p")
      end
    end
  end

  describe "#format_date_string" do
    it "returns date in specific format with year" do
      formatted_date = future_timestamp.strftime("%b %-d, %Y")
      expect(subject.new(timestamp: future_timestamp).send(:format_date_string)).to eq(formatted_date.to_s)
    end
  end

  describe "#format_datetime_string" do
    it "returns full date and time separated by middot" do
      formatted_datetime = "#{future_timestamp.strftime('%b %-d, %Y')} &middot; #{subject.new(timestamp: future_timestamp).send(:format_time_string)}"
      expect(subject.new(timestamp: future_timestamp).send(:format_datetime_string)).to eq(formatted_datetime)
    end
  end

  describe "#format_updated_string" do
    let(:name) { "Maricris Nonato" }

    context "for variant updated" do
      let(:variant) { "updated" }

      context "if show_user is true" do
        let(:show_user) { true }
        it "returns last updated with year including user's name" do
          timestamp = dynamic_future_timestamp
          date = timestamp.strftime("%b %-d, %Y")
          time = timestamp.strftime(" %l:%M%P").strip.gsub(/m$/, "")

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user, text: name).send(:format_updated_string)).to eq("Last updated by #{name} on #{date} at #{time}")
        end
      end

      context "if show_user is false" do
        let(:show_user) { false }
        it "returns last updated with year without user's name" do
          timestamp = dynamic_future_timestamp
          date = timestamp.strftime("%b %-d, %Y")
          time = timestamp.strftime(" %l:%M%P").strip.gsub(/m$/, "")

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user).send(:format_updated_string)).to eq("Last updated on #{date} at #{time}")
        end
      end
    end

    context "for variant elapsed" do
      let(:variant) { "elapsed" }
      context "if show_user is true" do
        let(:show_user) { true }
        it "returns time elaspsed string including user's name" do
          timestamp = DateTime.new(2020, 10, 10, 20, 30, 0o0).in_time_zone("America/New_York").freeze

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user, text: name).send(:format_elapsed_string)).to eq("Last updated by #{name} #{subject.new.send(:pb_time_ago, timestamp)} ago")
        end
      end

      context "if show_user is false" do
        let(:show_user) { false }
        it "returns time elaspsed string sans user's name" do
          timestamp = DateTime.new(2020, 10, 10, 20, 30, 0o0).in_time_zone("America/New_York").freeze

          expect(subject.new(timestamp: timestamp, variant: variant, show_user: show_user).send(:format_elapsed_string)).to eq("Last updated #{subject.new.send(:pb_time_ago, timestamp)} ago")
        end
      end
    end
  end
end
