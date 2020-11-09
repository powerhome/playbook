# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timestamp/timestamp"

RSpec.describe Playbook::PbTimestamp::Timestamp do
  subject { Playbook::PbTimestamp::Timestamp }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_timestamp_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_timestamp_kit additional_class"
    end
  end
end
