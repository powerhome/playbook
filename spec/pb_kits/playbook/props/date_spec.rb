# frozen_string_literal: true

RSpec.describe Playbook::Props::Date do
  describe "#validate" do
    it "returns true given a Ruby:Date", :aggregate_failures do
      expect(Playbook::Props::Date.new.validate(Date.new(2020, 03, 02))).to eq true
    end

    it "returns false given anything else", :aggregate_failures do
      expect(Playbook::Props::Date.new.validate("foo")).to eq false
      expect(Playbook::Props::Date.new.validate(true)).to eq false
      expect(Playbook::Props::Date.new.validate(:foo)).to eq false
      expect(Playbook::Props::Date.new.validate(1)).to eq false
      expect(Playbook::Props::Date.new.validate([])).to eq false
      expect(Playbook::Props::Date.new.validate(nil)).to eq false
    end
  end
end
