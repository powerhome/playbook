# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time/time"

RSpec.describe Playbook::PbTime::Time do
  subject { Playbook::PbTime::Time }

  it { is_expected.to define_partial }

  describe "classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_time_kit_sm"
    end
  end
end
