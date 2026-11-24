# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playground::PropFilter do
  describe ".filter_child_props" do
    it "keeps compound flex_item props when no nested kit.schema.json exists" do
      filtered = described_class.filter_child_props(
        kit_name: "flex/flex_item",
        props: {
          "fixedSize" => "250px",
          "grow" => true,
          "html_options" => { "onclick" => "alert(1)" },
        }
      )

      expect(filtered[:fixed_size]).to eq("250px")
      expect(filtered[:grow]).to be(true)
      expect(filtered).not_to have_key(:html_options)
    end

    it "keeps card_header and dialog_header kit props" do
      header = described_class.filter_child_props(
        kit_name: "card/card_header",
        props: { "headerColor" => "category_2", "padding" => "sm" }
      )
      expect(header[:header_color]).to eq("category_2")
      expect(header[:padding]).to eq("sm")

      dialog_header = described_class.filter_child_props(
        kit_name: "dialog/dialog_header",
        props: { "title" => "Hello", "id" => "dlg-1" }
      )
      expect(dialog_header[:title]).to eq("Hello")
      expect(dialog_header[:id]).to eq("dlg-1")
    end

    it "still drops blocked option hashes on compound kits" do
      filtered = described_class.filter_child_props(
        kit_name: "card/card_body",
        props: {
          "padding" => "md",
          "data" => { "x" => "1" },
          "aria" => { "label" => "x" },
          "style" => "color: red",
        }
      )

      expect(filtered[:padding]).to eq("md")
      expect(filtered).not_to have_key(:data)
      expect(filtered).not_to have_key(:aria)
      expect(filtered).not_to have_key(:style)
    end
  end

  describe "Rails number props" do
    it "converts numeric strings for props typed number on Rails" do
      filtered = described_class.filter_kit_and_globals(
        kit_name: "home_address_street",
        props: { "homeId" => "8250263", "address" => "70 Prospect Ave", "zipcode" => "19382" }
      )

      expect(filtered).to eq(home_id: 8_250_263, address: "70 Prospect Ave", zipcode: "19382")
    end

    it "leaves non-numeric strings for Rails to validate" do
      filtered = described_class.filter_kit_and_globals(kit_name: "home_address_street", props: { "homeId" => "H8250263" })

      expect(filtered[:home_id]).to eq("H8250263")
    end

    it "keeps zero and drops blank values so the optional prop falls back to nil" do
      expect(described_class.filter_kit_and_globals(kit_name: "home_address_street", props: { "homeId" => "0" })).to eq(home_id: 0)

      ["", "  "].each do |value|
        filtered = described_class.filter_kit_and_globals(kit_name: "home_address_street", props: { "homeId" => value })

        expect(filtered).not_to have_key(:home_id)
      end
    end

    it "leaves numbers with leading zeros as strings, matching the code generator" do
      %w[08 010 -07 007.5].each do |value|
        filtered = described_class.filter_kit_and_globals(kit_name: "home_address_street", props: { "homeId" => value })

        expect(filtered[:home_id]).to eq(value)
      end
    end
  end

  describe ".filter_kit_and_globals" do
    it "returns symbol-keyed plain hashes for nested request params" do
      params = ActiveSupport::HashWithIndifferentAccess.new(
        "user" => { "name" => "Ada Lovelace", "userId" => "42" }
      )

      filtered = described_class.filter_kit_and_globals(kit_name: "source", props: params)

      expect(filtered[:user]).to eq(name: "Ada Lovelace", user_id: "42")
      expect(filtered[:user]).not_to be_a(ActiveSupport::HashWithIndifferentAccess)
    end
  end
end
