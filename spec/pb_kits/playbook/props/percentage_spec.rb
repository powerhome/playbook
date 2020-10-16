# frozen_string_literal: true

RSpec.describe Playbook::Props::Percentage do
  subject { Playbook::Props::Percentage.new(name: :percentage_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(subject.validate(45)).to eq true
      expect(subject.validate(45.5)).to eq true
      expect(subject.validate(0.0)).to eq true
      expect(subject.validate(100)).to eq true
      expect(subject.validate(nil)).to eq true
    end

    it "returns false given anything less than 0", :aggregate_failures do
      expect(subject.validate(-1)).to eq false
      expect(subject.validate(-1.1)).to eq false
      expect(subject.validate(-100)).to eq false
    end

    it "returns false given anything greater than 100", :aggregate_failures do
      expect(subject.validate(101)).to eq false
      expect(subject.validate(100.1)).to eq false
      expect(subject.validate(100000)).to eq false
    end

    it "returns false given anything that is not numeric", :aggregate_failures do
      expect(subject.validate(true)).to eq false
      expect(subject.validate(:false)).to eq false
      expect(subject.validate("a")).to eq false
      expect(subject.validate({})).to eq false
    end
  end
end
