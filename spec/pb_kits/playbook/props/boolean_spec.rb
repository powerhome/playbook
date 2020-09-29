# frozen_string_literal: true

RSpec.describe Playbook::Props::Boolean do
  subject { Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given true" do
      expect(subject.validate(true)).to eq true
    end

    it "returns true given false" do
      expect(subject.validate(false)).to eq true
    end

    it "returns false given anything else", :aggregate_failures do
      expect(subject.validate("true")).to eq false
      expect(subject.validate(:false)).to eq false
      expect(subject.validate(1)).to eq false
      expect(subject.validate({})).to eq false
      expect(subject.validate([])).to eq false
      expect(subject.validate(nil)).to eq false
    end
  end
end
