# frozen_string_literal: true

RSpec.describe Playbook::Props::Number do
  describe "#validate" do
    it "returns true given a valid input" do
      expect(Playbook::Props::Number.new.validate(45)).to eq true
    end

    it "returns false given anything something besides a number", :aggregate_failures do
      expect(Playbook::Props::Number.new.validate("true")).to eq false
      expect(Playbook::Props::Number.new.validate(:false)).to eq false
      expect(Playbook::Props::Number.new.validate("a")).to eq false
      expect(Playbook::Props::Number.new.validate({})).to eq false
      expect(Playbook::Props::Number.new.validate(nil)).to eq false
    end
  end
end
