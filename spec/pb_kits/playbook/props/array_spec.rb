# frozen_string_literal: true

RSpec.describe Playbook::Props::Array do
  describe "#validate" do
    it "returns true given an empty array", :aggregate_failures do
      expect(Playbook::Props::Array.new(name: :array_prop).validate([])).to eq true
    end

    it "returns true given an array with things in it", :aggregate_failures do
      expect(Playbook::Props::Array.new(name: :array_prop).validate([true])).to eq true
      expect(Playbook::Props::Array.new(name: :array_prop).validate([:false])).to eq true
      expect(Playbook::Props::Array.new(name: :array_prop).validate([7, nil, 81])).to eq true
      expect(Playbook::Props::Array.new(name: :array_prop).validate(["foo", "bar", 8, {}, []])).to eq true
    end

    it "returns false given anything something besides an array", :aggregate_failures do
      expect(Playbook::Props::Array.new(name: :array_prop).validate("true")).to eq false
      expect(Playbook::Props::Array.new(name: :array_prop).validate(:false)).to eq false
      expect(Playbook::Props::Array.new(name: :array_prop).validate(1)).to eq false
      expect(Playbook::Props::Array.new(name: :array_prop).validate({})).to eq false
      expect(Playbook::Props::Array.new(name: :array_prop).validate(6.5)).to eq false
      expect(Playbook::Props::Array.new(name: :array_prop).validate(nil)).to eq false
    end
  end
end

