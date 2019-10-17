# frozen_string_literal: true

RSpec.describe Playbook::Props::HashArray do
  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(Playbook::Props::HashArray.new.validate([{}])).to eq true
      expect(Playbook::Props::HashArray.new.validate([{a: 1}])).to eq true
      expect(Playbook::Props::HashArray.new.validate([{"asdf": nil, foo: false}])).to eq true
    end

    it "returns false given an empty array" do
      expect(Playbook::Props::HashArray.new.validate([])).to eq false
    end

    it "returns false given anything something besides an array", :aggregate_failures do
      expect(Playbook::Props::HashArray.new.validate("true")).to eq false
      expect(Playbook::Props::HashArray.new.validate(:false)).to eq false
      expect(Playbook::Props::HashArray.new.validate(1)).to eq false
      expect(Playbook::Props::HashArray.new.validate({})).to eq false
      expect(Playbook::Props::HashArray.new.validate(6.5)).to eq false
      expect(Playbook::Props::HashArray.new.validate(nil)).to eq false
    end

    it "returns false given an array that does not contain hashes", :aggregate_failures do
      expect(Playbook::Props::HashArray.new.validate([true])).to eq false
      expect(Playbook::Props::HashArray.new.validate([:false])).to eq false
      expect(Playbook::Props::HashArray.new.validate([[]])).to eq false
      expect(Playbook::Props::HashArray.new.validate([6.5])).to eq false
      expect(Playbook::Props::HashArray.new.validate([nil])).to eq false
    end

    it "returns false given an array that doesn't only contain hashes", :aggregate_failures do
      expect(Playbook::Props::HashArray.new.validate([{}, true])).to eq false
      expect(Playbook::Props::HashArray.new.validate([8, {}])).to eq false
      expect(Playbook::Props::HashArray.new.validate([{}, :foo])).to eq false
      expect(Playbook::Props::HashArray.new.validate([{}, 6.5])).to eq false
      expect(Playbook::Props::HashArray.new.validate([nil, {}])).to eq false
    end
  end
end
