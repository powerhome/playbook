# frozen_string_literal: true

RSpec.describe Playbook::Props::Boolean do
  describe "#validate" do
    it "returns true given true" do
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate(true)).to eq true
    end

    it "returns true given false" do
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate(false)).to eq true
    end

    it "returns false given anything else", :aggregate_failures do
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate("true")).to eq false
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate(:false)).to eq false
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate(1)).to eq false
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate({})).to eq false
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate([])).to eq false
      expect(Playbook::Props::Boolean.new(name: :boolean_prop, kit: Class.new).validate(nil)).to eq false
    end
  end
end
