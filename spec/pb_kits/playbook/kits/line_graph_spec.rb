# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_line_graph/line_graph"

RSpec.describe Playbook::PbLineGraph::LineGraph do
  subject { Playbook::PbLineGraph::LineGraph }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:axis_title).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:point_start).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:subtitle).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:title).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:chart_data).of_type(Playbook::Props::Array).with_default([]) }
  it { is_expected.to define_prop(:gradient).of_type(Playbook::Props::Boolean).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_line_graph"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_line_graph additional_class"
    end
  end

  describe "#chart_type" do
    it "returns the correct type based on truthiness of gradient", :aggregate_failures do
      expect(subject.new({}).chart_type).to eq "line"
      expect(subject.new({gradient: false}).chart_type).to eq "line"
      expect(subject.new({gradient: true}).chart_type).to eq "area"
    end
  end
end
