# frozen_string_literal: true

RSpec.describe Playbook::Props::Date do
  subject { Playbook::Props::Date.new(name: :date_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a Ruby:Date", :aggregate_failures do
      expect(subject.validate(Date.new(2020, 0o3, 0o2))).to eq true
    end

    it "returns false given anything else", :aggregate_failures do
      expect(subject.validate("foo")).to eq false
      expect(subject.validate(true)).to eq false
      expect(subject.validate(:foo)).to eq false
      expect(subject.validate(1)).to eq false
      expect(subject.validate([])).to eq false
      expect(subject.validate(nil)).to eq false
    end
  end
end
