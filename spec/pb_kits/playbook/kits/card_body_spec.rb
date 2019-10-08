# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_card/card_body"

RSpec.describe Playbook::PbCard::CardBody do
  subject { Playbook::PbCard::CardBody }

  it { is_expected.to define_partial }

  it do
    is_expected.to define_enum_prop(:padding)
                   .with_default("md")
                   .with_values("none", "xs", "sm", "md", "lg", "xl")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_card_body_kit_md"
      expect(subject.new(padding: "none").classname).to eq "pb_card_body_kit_none"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_card_body_kit_md additional_class"
    end
  end
end
