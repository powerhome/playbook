# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/date_area"

RSpec.describe Playbook::PbTimeline::DateArea do
  subject { Playbook::PbTimeline::DateArea }

  it { is_expected.to define_prop(:date) }

  describe "#classname" do
    it "returns the correct class name" do
      expect(subject.new.classname).to eq "pb_timeline_item_left_block"
    end
  end
end
