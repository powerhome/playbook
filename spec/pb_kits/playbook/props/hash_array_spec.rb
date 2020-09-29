# frozen_string_literal: true

RSpec.describe Playbook::Props::HashArray do
  subject { Playbook::Props::HashArray.new(name: :hash_array_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(subject.validate([{}])).to eq true
      expect(subject.validate([{a: 1}])).to eq true
      expect(subject.validate([{"asdf": nil, foo: false}])).to eq true
      expect(subject.validate([])).to eq true
    end

    it "returns false given anything something besides an array", :aggregate_failures do
      expect(subject.validate("true")).to eq false
      expect(subject.validate(:false)).to eq false
      expect(subject.validate(1)).to eq false
      expect(subject.validate({})).to eq false
      expect(subject.validate(6.5)).to eq false
      expect(subject.validate(nil)).to eq false
    end

    it "returns false given an array that does not contain hashes", :aggregate_failures do
      expect(subject.validate([true])).to eq false
      expect(subject.validate([:false])).to eq false
      expect(subject.validate([[]])).to eq false
      expect(subject.validate([6.5])).to eq false
      expect(subject.validate([nil])).to eq false
    end

    it "returns false given an array that doesn't only contain hashes", :aggregate_failures do
      expect(subject.validate([{}, true])).to eq false
      expect(subject.validate([8, {}])).to eq false
      expect(subject.validate([{}, :foo])).to eq false
      expect(subject.validate([{}, 6.5])).to eq false
      expect(subject.validate([nil, {}])).to eq false
    end
  end
end
