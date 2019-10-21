# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::PbBody::Body do
  subject { Playbook::PbBody::Body }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_bar_graph"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_bar_graph additional_class"
    end
  end
end
