# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pb_circle_chart/pb_circle_chart"

RSpec.describe Playbook::PbPbCircleChart::PbCircleChart do
  subject { Playbook::PbPbCircleChart::PbCircleChart }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_pb_circle_chart"
    end
  end
end
