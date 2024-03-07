# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_card/card"

RSpec.describe Playbook::PbCard::Card do
  subject { Playbook::PbCard::Card }

  it { is_expected.to define_boolean_prop(:selected).with_default(false) }
  it {
    is_expected.to define_prop(:highlight)
      .of_type(Playbook::Props::HashProp)
      .with_default({})
  }
  it {
    is_expected.to define_boolean_prop(:border_none)
      .with_default(false)
  }

  it do
    is_expected.to define_enum_prop(:background)
      .with_default("none")
      .with_values("white", "light", "dark", "product_1_background", "product_1_highlight", "product_2_background", "product_2_highlight", "product_3_background", "product_3_highlight", "product_4_background", "product_4_highlight", "product_5_background", "product_5_highlight", "product_6_background", "product_6_highlight", "product_7_background", "product_7_highlight", "product_8_background", "product_8_highlight", "product_9_background", "product_9_highlight", "product_10_background", "product_10_highlight", "windows", "siding", "doors", "solar", "roofing", "gutters", "insulation", "none")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_card_kit_deselected border_radius_md"
      expect(subject.new(selected: true).classname).to eq "pb_card_kit_selected border_radius_md"
      expect(subject.new(border_none: true).classname).to eq "pb_card_kit_deselected_border_none border_radius_md"
      expect(subject.new(shadow: "deeper").classname).to eq "pb_card_kit_deselected shadow_deeper border_radius_md"
      expect(subject.new(selected: true, shadow: "deep").classname).to eq "pb_card_kit_selected shadow_deep border_radius_md"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_card_kit_deselected additional_class border_radius_md"
      expect(subject.new(highlight: { position: "top" }).classname).to eq "pb_card_kit_deselected_highlight_top border_radius_md"
      expect(subject.new(highlight: { position: "side" }).classname).to eq "pb_card_kit_deselected_highlight_side border_radius_md"
      expect(subject.new(highlight: { color: "windows" }).classname).to eq "pb_card_kit_deselected_highlight_windows border_radius_md"
      expect(subject.new(highlight: { color: "error" }).classname).to eq "pb_card_kit_deselected_highlight_error border_radius_md"
      expect(subject.new(highlight: { color: "category_2" }).classname).to eq "pb_card_kit_deselected_highlight_category_2 border_radius_md"
      expect(subject.new(background: "dark", classname: "dark").classname).to eq "pb_card_kit_deselected_background_dark dark border_radius_md"
      expect(subject.new(background: "siding").classname).to eq "pb_card_kit_deselected_background_siding border_radius_md"
    end
  end
end
