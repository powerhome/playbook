# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Props::NestedProps do
  subject { described_class.new(name: :subkit_props, kit: Class.new, nested_kit: Playbook::PbLegend::Legend) }

  describe "#validate" do
    it "is valid if nil" do
      expect(subject.validate(nil)).to be true
    end

    it "is valid if conforms to the given kits props" do
      expect(subject.validate(color: "data_1", text: "valid")).to be true
    end

    it "is not valid if a value doesn't conform to the expected values of a kit" do
      expect(subject.validate(color: "data_2")).to be false
    end
  end
end
