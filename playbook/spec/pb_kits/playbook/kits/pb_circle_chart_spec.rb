# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pb_circle_chart/pb_circle_chart"

RSpec.describe Playbook::PbPbCircleChart::PbCircleChart do
  subject { Playbook::PbPbCircleChart::PbCircleChart }

  it { is_expected.to define_prop(:options) }

  describe "#classname_and_id" do
    it "returns empty string for classname since it's handled in React", :aggregate_failures do
      expect(subject.new.classname).to eq ""
      expect(subject.new(classname: "additional_class").classname).to eq " additional_class"
    end

    it "passes className through react_props" do
      expect(subject.new.react_props[:className]).to eq ""
      expect(subject.new(classname: "custom-class").react_props[:className]).to eq " custom-class"
    end

    it "attaches id as expected" do
      expect(subject.new(id: "test-id").react_props[:id]).to eq "test-id"
    end
  end

  describe "#react_props includes data" do
    it "includes data in react_props" do
      expect(subject.new(data: { test: "value" }).react_props[:data]).to eq({ test: "value" })
    end
  end

  describe "#global props work as expected" do
    it "global props work" do
      expect(subject.new(margin: "lg").classname).to eq(" m_lg")
    end
  end
end
