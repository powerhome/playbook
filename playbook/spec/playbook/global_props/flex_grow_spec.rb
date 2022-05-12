# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::FlexGrow do
  subject { Playbook::PbBody::Body }
  let(:screen_sizes) { %w[xs sm md lg xl] }

  describe "#classname" do
    it "returns ordinal suffixed class name", :aggregate_failures do
      2.times do |num|
        expect(subject.new({ flex_grow: num }).classname).to include("flex_grow_#{num}")

        screen_sizes.each do |size|
          obj = {}
          obj[size] = num
          expect(subject.new({ flex_grow: obj }).classname).to include("flex_grow_#{size}_#{num}")
        end
      end
    end
  end
end
