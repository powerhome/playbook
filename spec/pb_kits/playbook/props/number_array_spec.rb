# frozen_string_literal: true

RSpec.describe Playbook::Props::NumberArray do
  describe "#validate" do
    it "returns true given a valid input" do
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([45, 67])).to eq true
    end

    it "returns false given an empty array" do
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([])).to eq false
    end

    it "returns false given anything something besides an array", :aggregate_failures do
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate("true")).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate(:false)).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate(1)).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate({})).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate(6.5)).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate(nil)).to eq false
    end

    it "returns false given an array that does not contain integers", :aggregate_failures do
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([true])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([:false])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([{}])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([6.5])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([nil])).to eq false
    end

    it "returns false given an array that doesn't only contain integers", :aggregate_failures do
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([7, true])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([8, :false])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([{}, 9])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([1, 3, 5, 6.5])).to eq false
      expect(Playbook::Props::NumberArray.new(name: :number_array_prop, kit: Class.new).validate([nil, 0, 65])).to eq false
    end
  end
end
