# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playground::RailsRenderer do
  let(:controller) { ApplicationController.new }
  let(:view_context) { controller.view_context }

  describe "#render" do
    it "renders a button with snake_case props" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "text" => "Click Me",
          "variant" => "primary",
          "fullWidth" => true,
        }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Click Me")
      expect(result[:html]).to include("pb_button")
    end

    it "rejects kits outside the POC allowlist" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "advanced_table",
        props: {}
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to include("not enabled")
    end

    it "returns validation errors for invalid prop values" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "variant" => "not-a-real-variant",
        }
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to be_present
    end

    it "renders flex children with JSX Caption components" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {
          "orientation" => "row",
        },
        children: "<Caption text=\"A\" />\n<Caption text=\"B\" />\n<Caption text=\"C\" />"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("A")
      expect(result[:html]).to include("B")
      expect(result[:html]).to include("C")
      expect(result[:html]).to include("pb_caption_kit")
    end

    it "renders HTML in block children instead of escaping it" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: "<b>test</b>",
        structure_mode: "simple"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("<b>test</b>")
      expect(result[:html]).not_to include("&lt;b&gt;")
    end

    it "renders compound card structure for header_body mode" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {
          "headerColor" => "category_1",
          "headerColorStriped" => false,
        },
        children: "Body content here",
        structure_mode: "header_body"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Header title")
      expect(result[:html]).to include("Body content here")
      expect(result[:html]).to include("pb_card_header_kit")
      expect(result[:html]).to include("pb_card_body_kit")
    end

    it "renders compound card structure with footer for full mode" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {
          "headerColor" => "success",
        },
        children: "Body content here",
        structure_mode: "full"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Header title")
      expect(result[:html]).to include("Body content here")
      expect(result[:html]).to include("Action")
    end

    it "renders compound dialog structure for subcomponents mode" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "dialog",
        props: { "size" => "sm" },
        children: "Hello Body Text, Nice to meet ya.",
        structure_mode: "subcomponents"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Open Dialog")
      expect(result[:html]).to include("Header Title inside Dialog.Header")
      expect(result[:html]).to include("Hello Body Text, Nice to meet ya.")
      expect(result[:html]).to include("Cancel Button")
    end
  end
end
