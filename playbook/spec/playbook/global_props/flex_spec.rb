# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns ordinal suffixed class name", :aggregate_failures do
      13.times do |num|
        expect(subject.new({ flex: num }).classname).to include("flex_#{num}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = num
          expect(subject.new({ flex: obj }).classname).to include("flex_#{size}_#{num}")
        end
      end
    end

    it "returns proper class name", :aggregate_failures do
      %w[auto initial none].each do |word|
        expect(subject.new({ flex: word }).classname).to include("flex_#{word}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = word
          expect(subject.new({ flex: obj }).classname).to include("flex_#{size}_#{word.underscore}")
        end
      end
    end
  end
end
