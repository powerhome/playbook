# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_title_count/title_count"

RSpec.describe Playbook::PbTitleCount::TitleCount do
  subject { Playbook::PbTitleCount::TitleCount }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_title_count_kit"
      expect(subject.new(align: "center").classname).to eq "pb_title_count_kit_center"
    end
  end
end
