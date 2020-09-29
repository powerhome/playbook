# frozen_string_literal: true

RSpec.describe Playbook::Props::Array do
  subject { Playbook::Props::Array.new(name: :array_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given an empty array", :aggregate_failures do
      expect(subject.validate([])).to eq true
    end

    it "returns true given an array with things in it", :aggregate_failures do
      expect(subject.validate([true])).to eq true
      expect(subject.validate([:false])).to eq true
      expect(subject.validate([7, nil, 81])).to eq true
      expect(subject.validate(["foo", "bar", 8, {}, []])).to eq true
    end

    it "returns false given anything something besides an array", :aggregate_failures do
      expect(subject.validate("true")).to eq false
      expect(subject.validate(:false)).to eq false
      expect(subject.validate(1)).to eq false
      expect(subject.validate({})).to eq false
      expect(subject.validate(6.5)).to eq false
      expect(subject.validate(nil)).to eq false
    end
  end
end

