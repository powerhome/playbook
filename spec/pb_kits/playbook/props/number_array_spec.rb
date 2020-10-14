# frozen_string_literal: true

RSpec.describe Playbook::Props::NumberArray do
  subject { Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a valid input" do
      expect(subject.validate([45, 67])).to eq true
    end

    it "returns false given an empty array" do
      expect(subject.validate([])).to eq false
    end

    it "returns false given anything something besides an array", :aggregate_failures do
      expect(subject.validate("true")).to eq false
      expect(subject.validate(:false)).to eq false
      expect(subject.validate(1)).to eq false
      expect(subject.validate({})).to eq false
      expect(subject.validate(6.5)).to eq false
      expect(subject.validate(nil)).to eq false
    end

    it "returns false given an array that does not contain integers", :aggregate_failures do
      expect(subject.validate([true])).to eq false
      expect(subject.validate([:false])).to eq false
      expect(subject.validate([{}])).to eq false
      expect(subject.validate([6.5])).to eq false
      expect(subject.validate([nil])).to eq false
    end

    it "returns false given an array that doesn't only contain integers", :aggregate_failures do
      expect(subject.validate([7, true])).to eq false
      expect(subject.validate([8, :false])).to eq false
      expect(subject.validate([{}, 9])).to eq false
      expect(subject.validate([1, 3, 5, 6.5])).to eq false
      expect(subject.validate([nil, 0, 65])).to eq false
    end
  end
end
