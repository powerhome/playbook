# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_bar_graph/bar_graph"

RSpec.describe Playbook::PbBarGraph::BarGraph do
  subject { Playbook::PbBarGraph::BarGraph }

  it { is_expected.to define_prop(:options).with_default({}) }
  it { is_expected.to define_prop(:container_props).with_default({}) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_bar_graph"
    end
  end
end
