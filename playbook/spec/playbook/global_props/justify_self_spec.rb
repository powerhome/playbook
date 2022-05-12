# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns proper class name", :aggregate_failures do
      %w[auto start end center stretch].each do |word|
        expect(subject.new({ justify_self: word }).classname).to include("justify_self_#{word.underscore}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = word
          expect(subject.new({ justify_self: obj }).classname).to include("justify_self_#{size}_#{word.underscore}")
        end
      end
    end
  end
end
