# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns proper class name", :aggregate_failures do
      %w[wrap nowrap wrapReverse].each do |word|
        expect(subject.new({ flex_wrap: word }).classname).to include("flex_wrap_#{word}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = word
          expect(subject.new({ flex_wrap: obj }).classname).to include("flex_wrap_#{size}_#{word.underscore}")
        end
      end
    end
  end
end
