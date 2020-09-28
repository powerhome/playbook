# frozen_string_literal: true

RSpec.describe Playbook::Props::Number do
  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(Playbook::Props::Number.new(name: :number_prop).validate(45)).to eq true
      expect(Playbook::Props::Number.new(name: :number_prop).validate(nil)).to eq true
    end

    it "returns false given anything besides a number", :aggregate_failures do
      expect(Playbook::Props::Number.new(name: :number_prop).validate("true")).to eq false
      expect(Playbook::Props::Number.new(name: :number_prop).validate(:false)).to eq false
      expect(Playbook::Props::Number.new(name: :number_prop).validate("a")).to eq false
      expect(Playbook::Props::Number.new(name: :number_prop).validate({})).to eq false
    end
  end
end
