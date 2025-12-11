# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/label"

RSpec.describe Playbook::PbTimeline::Label do
  subject { Playbook::PbTimeline::Label }

  it { is_expected.to define_prop(:date) }
  it {
    is_expected.to define_boolean_prop(:show_current_year)
      .with_default(false)
  }

  describe "#classname" do
    it "returns the correct class name" do
      expect(subject.new.classname).to eq "pb_timeline_item_left_block"
    end
  end
end
