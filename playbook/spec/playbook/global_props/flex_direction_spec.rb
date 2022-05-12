# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns proper class name", :aggregate_failures do
      %w[row column rowReverse columnReverse].each do |word|
        expect(subject.new({ flex_direction: word }).classname).to include("flex_direction_#{word.underscore}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = word
          expect(subject.new({ flex_direction: obj }).classname).to include("flex_direction_#{size}_#{word.underscore}")
        end
      end
    end
  end
end
