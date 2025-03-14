# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns proper class name", :aggregate_failures do
      %w[block inline_block inline flex inline_flex none grid].each do |word|
        expect(subject.new({ display: word }).classname).to include("display_#{word}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = word
          expect(subject.new({ display: obj }).classname).to include("display_#{size}_#{word}")
        end
      end
    end
  end
end
