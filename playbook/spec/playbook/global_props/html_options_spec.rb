# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  describe "html_options" do
    it "returns html options", :aggregate_failures do
      body = subject.new(html_options: { foo: "bar" })
      expect(body.html_options).to eq(foo: "bar")
    end
  end
end
