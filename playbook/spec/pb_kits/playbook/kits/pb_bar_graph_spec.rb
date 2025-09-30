# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pb_bar_graph/pb_bar_graph"

RSpec.describe Playbook::PbPbBarGraph::PbBarGraph do
  subject { Playbook::PbPbBarGraph::PbBarGraph }

  it { is_expected.to define_prop(:options) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_pb_bar_graph"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_pb_bar_graph additional_class"
    end
  end
end
