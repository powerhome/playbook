# frozen_string_literal: true

RSpec.describe Playbook::Props::Number do
  subject { Playbook::Props::Number.new(name: :number_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(subject.validate(45)).to eq true
      expect(subject.validate(nil)).to eq true
    end

    it "returns false given anything besides a number", :aggregate_failures do
      expect(subject.validate("true")).to eq false
      expect(subject.validate(:false)).to eq false
      expect(subject.validate("a")).to eq false
      expect(subject.validate({})).to eq false
    end
  end
end
