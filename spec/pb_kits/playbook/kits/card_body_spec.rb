# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_card/card_body"

module Playbook
  module PbCard
    describe CardBody do
      subject { CardBody }

      it { is_expected.to define_partial }

      it { is_expected.to define_enum_prop(:padding).with_default("md") }

      describe "#classname" do
        it "returns namespaced class name", :aggregate_failures do
          expect(CardBody.new({}).classname).to eq "pb_card_body_kit_md"
          expect(CardBody.new(padding: "none").classname).to eq "pb_card_body_kit_none"
          expect(CardBody.new(classname: "additional_class").classname).to eq "pb_card_body_kit_md additional_class"
        end
      end
    end
  end
end
