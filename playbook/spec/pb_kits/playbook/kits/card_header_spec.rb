# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_card/card_header"

RSpec.describe Playbook::PbCard::CardHeader do
  subject { Playbook::PbCard::CardHeader }

  it {
    is_expected.to define_string_prop(:header_color)
      .with_default("category_1")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_card_header_kit pb_card_header_kit_category_1"
      expect(subject.new(header_color: "category_2").classname).to eq "pb_card_header_kit pb_card_header_kit_category_2"
      expect(subject.new(header_color: "siding").classname).to eq "pb_card_header_kit pb_card_header_kit_siding"
      expect(subject.new(header_color: "gutters").classname).to eq "pb_card_header_kit pb_card_header_kit_gutters"
      expect(subject.new(header_color: "bg_dark").classname).to eq "pb_card_header_kit pb_card_header_kit_bg_dark"
      expect(subject.new(header_color_striped: true).classname).to eq "pb_card_header_kit pb_card_header_kit_category_1 pb_card_header_kit_category_1_striped"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_card_header_kit pb_card_header_kit_category_1 additional_class"
    end
  end
end
