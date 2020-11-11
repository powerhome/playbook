# frozen_string_literal: true

RSpec.describe Playbook::Props::Numeric do
  subject { Playbook::Props::Numeric.new(name: :numeric_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a valid input", :aggregate_failures do
      expect(subject.validate(nil)).to eq true
      expect(subject.validate(12)).to eq true
      expect(subject.validate(12.3)).to eq true
    end

    it "returns false given anything besides a integer or float", :aggregate_failures do
      expect(subject.validate("seventy")).to eq false
      expect(subject.validate(:seventy)).to eq false
      expect(subject.validate("70")).to eq false
      expect(subject.validate({})).to eq false
    end
  end
end
