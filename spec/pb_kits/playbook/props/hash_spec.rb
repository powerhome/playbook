# frozen_string_literal: true

RSpec.describe Playbook::Props::Hash do
  describe "#validate" do
    it "returns true given a Ruby Hash", :aggregate_failures do
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate({})).to eq true
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate(a: 1)).to eq true
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate("foo" => :bar)).to eq true
    end

    it "returns false given anything else", :aggregate_failures do
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate("foo")).to eq false
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate(true)).to eq false
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate(:foo)).to eq false
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate(1)).to eq false
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate([])).to eq false
      expect(Playbook::Props::Hash.new(name: :hash_prop).validate(nil)).to eq false
    end
  end
end
