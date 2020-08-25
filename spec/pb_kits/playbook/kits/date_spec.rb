# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date/date"

RSpec.describe Playbook::PbDate::Date do
  subject { Playbook::PbDate::Date }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:date) }
  it { is_expected.to define_prop(:timezone) }
  it do
    is_expected.to define_enum_prop(:size)
                   .with_default("sm")
                   .with_values("lg", "sm", "xs")
    end

  describe "#xs_date" do
    it "displays the date" do
      expect(subject.new(
        date: Date.new(2019, 10, 31),
        size: "xs"
      ).xs_date).to include "OCT 31"
    end
  end

  describe "#sm_date" do
    it "displays the date" do
      expect(subject.new(
        date: Date.new(2019, 10, 20),
        size: "sm"
      ).sm_date).to include "OCT 20"
    end
  end

  describe "#lg_date" do
    it "displays the date" do
      expect(subject.new(
        date: Date.new(2019, 10, 19),
        size: "lg"
      ).lg_date).to include "OCT 19"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { date: Date.today }

      expect(subject.new(required_props).classname).to eq "pb_date_kit"
      expect(subject.new(required_props.merge(classname: "additional_class")).classname).to eq "pb_date_kit additional_class"
    end
  end
end
