# frozen_string_literal: true

module Playbook
  module Props
    describe Hash do
      describe "#validate" do
        it "returns true given a Ruby Hash", :aggregate_failures do
          expect(Hash.new.validate({})).to eq true
          expect(Hash.new.validate(a: 1)).to eq true
          expect(Hash.new.validate("foo" => :bar)).to eq true
        end

        it "returns false given anything else", :aggregate_failures do
          expect(Hash.new.validate("foo")).to eq false
          expect(Hash.new.validate(true)).to eq false
          expect(Hash.new.validate(:foo)).to eq false
          expect(Hash.new.validate(1)).to eq false
          expect(Hash.new.validate([])).to eq false
          expect(Hash.new.validate(nil)).to eq false
        end
      end
    end
  end
end
