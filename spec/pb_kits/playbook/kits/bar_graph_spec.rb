# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_bar_graph/bar_graph"

RSpec.describe Playbook::PbBarGraph::BarGraph do
  subject { Playbook::PbBarGraph::BarGraph }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:axis_title) }
  it { is_expected.to define_prop(:point_start) }
  it { is_expected.to define_prop(:subtitle) }
  it { is_expected.to define_prop(:title) }
  it { is_expected.to define_enum_prop(:orientation)
                      .with_default("vertical")
                      .with_values("vertical", "horizontal") }
  it { is_expected.to define_prop(:chart_data)
                      .with_default([])}

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_bar_graph"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_bar_graph additional_class"
    end
  end
end
