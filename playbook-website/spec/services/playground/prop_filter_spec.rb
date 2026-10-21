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
end
