# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_card/card"

RSpec.describe Playbook::PbCard::Card do
  subject { Playbook::PbCard::Card }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:selected).with_default(false) }
  it { is_expected.to define_prop(:highlight)
                      .of_type(Playbook::Props::Hash)
                      .with_default({}) }
  it { is_expected.to define_boolean_prop(:border)
                      .with_default(true) }
  it do
    is_expected.to define_enum_prop(:shadow)
                   .with_default("none")
                   .with_values("none", "deep", "deeper", "deepest")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_card_kit_deselected"
      expect(subject.new(selected: true).classname).to eq "pb_card_kit_selected"
      expect(subject.new(border: false).classname).to eq "pb_card_kit_deselected_border_none"
      expect(subject.new(shadow: "deeper").classname).to eq "pb_card_kit_deselected_shadow_deeper"
      expect(subject.new(selected: true, shadow: "deep").classname).to eq "pb_card_kit_selected_shadow_deep"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_card_kit_deselected additional_class"
      expect(subject.new(highlight: {position: "top"}).classname).to eq "pb_card_kit_deselected_highlight_top"
      expect(subject.new(highlight: {position: "side"}).classname).to eq "pb_card_kit_deselected_highlight_side"
      expect(subject.new(highlight: {color: "windows"}).classname).to eq "pb_card_kit_deselected_highlight_windows"
      expect(subject.new(highlight: {color: "error"}).classname).to eq "pb_card_kit_deselected_highlight_error"
      expect(subject.new(highlight: {color: "category_2"}).classname).to eq "pb_card_kit_deselected_highlight_category_2"

    end
  end
end
