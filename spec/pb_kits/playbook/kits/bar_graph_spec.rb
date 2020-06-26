# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_bar_graph/bar_graph"

RSpec.describe Playbook::PbBarGraph::BarGraph do
  subject { Playbook::PbBarGraph::BarGraph }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:axis_title) }
  it { is_expected.to define_prop(:point_start).of_type(Playbook::Props::Numeric) }
  it { is_expected.to define_prop(:subtitle) }
  it { is_expected.to define_prop(:legend).of_type(Playbook::Props::Boolean).with_default(false) }
  it { is_expected.to define_prop(:toggle_legend_click).of_type(Playbook::Props::Boolean).with_default(true) }
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

  describe "#chart_type" do
    it "returns the correct type based on orientation", :aggregate_failures do
      expect(subject.new({}).chart_type).to eq "column"
      expect(subject.new({orientation: "vertical"}).chart_type).to eq "column"
      expect(subject.new({orientation: "horizontal"}).chart_type).to eq "bar"
    end
  end

  describe "#chart_options" do
    it "returns the correct options in a json object", :aggregate_failures do
      expect(subject.new({title: "New Chart"}).chart_options).to include "\"type\":\"column\",\"title\":\"New Chart\""
      expect(subject.new({point_start: 4}).chart_options).to include "\"pointStart\":4"
    end
  end
end
