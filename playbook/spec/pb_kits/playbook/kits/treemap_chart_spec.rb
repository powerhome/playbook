# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_treemap_chart/treemap_chart"

RSpec.describe Playbook::PbTreemapChart::TreemapChart do
  subject { Playbook::PbTreemapChart::TreemapChart }

  it { is_expected.to define_prop(:chart_data).of_type(Playbook::Props::Array).with_default([]) }
  it { is_expected.to define_prop(:colors).with_default([]) }
  it { is_expected.to define_boolean_prop(:drillable) }
  it { is_expected.to define_boolean_prop(:grouped) }
  it { is_expected.to define_prop(:height).of_type(Playbook::Props::String).with_default(nil) }
  it { is_expected.to define_prop(:title).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:tooltip_html).of_type(Playbook::Props::String) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_treemap_chart"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_treemap_chart additional_class"
    end
  end
end
