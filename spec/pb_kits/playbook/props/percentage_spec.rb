# frozen_string_literal: true

RSpec.describe Playbook::Props::Percentage do
  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(45)).to eq true
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(45.5)).to eq true
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(0.0)).to eq true
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(100)).to eq true
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(nil)).to eq true
    end

    it "returns false given anything less than 0", :aggregate_failures do
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(-1)).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(-1.1)).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(-100)).to eq false
    end

    it "returns false given anything greater than 100", :aggregate_failures do
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(101)).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(100.1)).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(100000)).to eq false
    end

    it "returns false given anything that is not numeric", :aggregate_failures do
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(true)).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate(:false)).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate("a")).to eq false
      expect(Playbook::Props::Percentage.new(name: :percentage_prop).validate({})).to eq false
    end
  end
end
