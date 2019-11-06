# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date/date"

RSpec.describe Playbook::PbDate::Date do
  subject { Playbook::PbDate::Date }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:date) }
  it do
    is_expected.to define_enum_prop(:size)
                   .with_default("sm")
                   .with_values("lg", "sm", "xs")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_date_kit_sm"
      expect(subject.new(size: "lg").classname).to eq "pb_date_kit_lg"
    end
  end
end
