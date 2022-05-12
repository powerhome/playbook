# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns ordinal suffixed class name", :aggregate_failures do
      (1..12).each do |num|
        expect(subject.new({ order: num }).classname).to include("flex_order_#{num}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = num
          expect(subject.new({ order: obj }).classname).to include("order_#{size}_#{num}")
        end
      end
    end
  end
end
