# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/detail"

RSpec.describe Playbook::PbTimeline::Detail do
  subject { Playbook::PbTimeline::Detail }

  describe "#classname" do
    it "returns the correct class name" do
      expect(subject.new({}).classname).to eq "pb_timeline_item_right_block"
    end
  end
end
