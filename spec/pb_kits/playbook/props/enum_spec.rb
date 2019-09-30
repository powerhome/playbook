# frozen_string_literal: true

module Playbook
  module Props
    describe Enum do
      describe "#validate" do
        it "returns true given value supplied upon initialization", :aggregate_failures do
          enum = Enum.new(values: [1, "two", :three])

          expect(enum.validate(1)).to eq true
          expect(enum.validate("two")).to eq true
          expect(enum.validate(:three)).to eq true
        end

        it "returns false given anything else", :aggregate_failures do
          enum = Enum.new(values: [])

          expect(enum.validate(true)).to eq false
          expect(enum.validate(:foo)).to eq false
          expect(enum.validate(1)).to eq false
          expect(enum.validate({})).to eq false
          expect(enum.validate([])).to eq false
          expect(enum.validate(nil)).to eq false
        end
      end
    end
  end
end
