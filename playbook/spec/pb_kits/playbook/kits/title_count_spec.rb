# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_title_count/title_count"

RSpec.describe Playbook::PbTitleCount::TitleCount do
  subject { Playbook::PbTitleCount::TitleCount }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_title_count_kit_left_sm"
      expect(subject.new(align: "center").classname).to eq "pb_title_count_kit_center_sm"
      expect(subject.new(size: "lg").classname).to eq "pb_title_count_kit_left_lg"
      expect(subject.new(align: "center", size: "lg").classname).to eq "pb_title_count_kit_center_lg"
      expect(subject.new(align: "right", size: "lg", dark: true).classname).to eq "pb_title_count_kit_right_lg dark"
    end
  end
end
