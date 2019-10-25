# frozen_string_literal: true

RSpec.describe Playbook::Props::Numeric do
  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(Playbook::Props::Numeric.new.validate(nil)).to eq true
      expect(Playbook::Props::Numeric.new.validate(12)).to eq true
      expect(Playbook::Props::Numeric.new.validate(12.3)).to eq true
    end

    it "returns false given anything besides a integer or float", :aggregate_failures do
      expect(Playbook::Props::Numeric.new.validate("seventy")).to eq false
      expect(Playbook::Props::Numeric.new.validate(:seventy)).to eq false
      expect(Playbook::Props::Numeric.new.validate("70")).to eq false
      expect(Playbook::Props::Numeric.new.validate({})).to eq false
    end
  end
end
