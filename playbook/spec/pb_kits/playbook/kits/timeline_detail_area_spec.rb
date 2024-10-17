# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/detail_area"

RSpec.describe Playbook::PbTimeline::DetailArea do
  subject { Playbook::PbTimeline::DetailArea }

  describe "#classname" do
    it "returns the correct class name" do
      expect(subject.new({}).classname).to eq "pb_timeline_item_right_block"
    end
  end
end
