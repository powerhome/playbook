# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  describe "#classname" do
    it "returns correct truncate classname", :aggregate_failures do
      %w[1 2 3 4 5].each do |num|
        expect(subject.new({ truncate: num }).classname).to include("truncate_#{num}")
      end
    end
  end
end
