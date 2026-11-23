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

  describe "Date props" do
    it "converts ISO strings to Date and DateTime objects" do
      filtered = described_class.filter_kit_and_globals(
        kit_name: "date_range_inline",
        props: { "startDate" => "2026-04-09", "endDate" => "2026-04-09T15:30:00.000Z" }
      )

      expect(filtered[:start_date]).to eq(Date.new(2026, 4, 9))
      expect(filtered[:end_date]).to eq(DateTime.new(2026, 4, 9, 15, 30))
    end

    it "leaves other strings as typed and drops invalid ISO dates" do
      filtered = described_class.filter_kit_and_globals(
        kit_name: "timestamp",
        props: { "timestamp" => "April 9, 2026", "text" => "2026-04-09" }
      )
      invalid = described_class.filter_kit_and_globals(
        kit_name: "date_stacked",
        props: { "date" => "2026-13-45" }
      )

      expect(filtered).to eq(timestamp: "April 9, 2026", text: "2026-04-09")
      expect(invalid).not_to have_key(:date)
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
