# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_card/card"

module Playbook
  module PbCard
    describe Card do
      subject { Card }

      it { is_expected.to define_partial }

      it { is_expected.to define_boolean_prop(:selected).with_default(false) }
      it do
        is_expected.to define_enum_prop(:padding)
                       .with_default("md")
                       .with_values("none", "xs", "sm", "md", "lg", "xl")
      end
      it do
        is_expected.to define_enum_prop(:shadow)
                       .with_default("none")
                       .with_values("none", "shallow", "default",
                                    "deep", "deeper", "deepest")
      end

      describe "#classname" do
        it "returns namespaced class name", :aggregate_failures do
          expect(Card.new({}).classname).to eq "pb_card_kit_deselected"
          expect(Card.new(selected: true).classname).to eq "pb_card_kit_selected"
          expect(Card.new(shadow: "deeper").classname).to eq "pb_card_kit_deselected_shadow_deeper"
          expect(Card.new(selected: true, shadow: "shallow").classname).to eq "pb_card_kit_selected_shadow_shallow"
          expect(Card.new(classname: "additional_class").classname).to eq "pb_card_kit_deselected additional_class"
        end
      end
    end
  end
end
