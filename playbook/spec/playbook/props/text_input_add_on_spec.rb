# frozen_string_literal: true

RSpec.describe Playbook::Props::TextInputAddOn do
  subject { described_class.new(name: :text_input_add_on_prop, kit: Class.new) }

  describe "#validate" do
    it "returns true given a Ruby Hash", :aggregate_failures do
      expect(subject.validate({})).to eq true
      expect(subject.validate(icon: 'user')).to eq true
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
