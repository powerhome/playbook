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
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_ERROR)
    end

    it "returns a generic error for invalid prop values" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "variant" => "not-a-real-variant",
        }
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_ERROR)
    end

    it "rejects oversized children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: "x" * (Playground::PreviewLimits::MAX_CHILDREN_BYTES + 1),
        structure_mode: "simple"
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_LIMIT_ERROR)
    end

    it "rejects props nested beyond the depth limit" do
      nested = { "a" => "leaf" }
      (Playground::PreviewLimits::MAX_HASH_DEPTH + 2).times do
        nested = { "wrap" => nested }
      end

      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: nested
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_LIMIT_ERROR)
    end

    it "drops unknown props and html_options instead of forwarding them to the kit" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "text" => "Safe",
          "notARealProp" => "ignore-me",
          "htmlOptions" => { "onmouseover" => "alert(document.cookie)" },
        }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Safe")
      expect(result[:html]).not_to include("onmouseover")
      expect(result[:html]).not_to include("alert(document.cookie)")
      expect(result[:html]).not_to include("ignore-me")
    end

    it "filters dangerous props on nested JSX children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: { "orientation" => "row" },
        children: '<Button text="Child" htmlOptions="ignored" />'
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Child")
      expect(result[:html]).to include("pb_button")
      expect(result[:html]).not_to include("htmlOptions")
      expect(result[:html]).not_to include("ignored")
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

    it "escapes raw HTML in plain block children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: "<b>test</b>",
        structure_mode: "simple"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("&lt;b&gt;test&lt;/b&gt;")
      expect(result[:html]).not_to include("<b>test</b>")
    end

    it "does not treat script tags in plain children as executable HTML" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: '<script>alert("x")</script>',
        structure_mode: "simple"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).not_to include("<script>")
      expect(result[:html]).to include("&lt;script&gt;")
    end

    it "rejects non-allowlisted kits nested in ERB children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {},
        children: '<%= pb_rails("advanced_table") %>',
        structure_mode: "basic"
      ).render

      expect(result[:error]).to be_nil
      # Disallowed kit is not rendered; children fall back to escaped plain text.
      expect(result[:html].to_s).not_to include("pb_advanced_table")
      expect(result[:html].to_s).to include("&lt;%=")
      expect(result[:html].to_s).not_to include("<script>")
    end

    it "does not mis-parse ERB when content precedes pb_rails" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {},
        children: 'NOTE <%= pb_rails("caption", props: { text: "Hi" }) %>',
        structure_mode: "basic"
      ).render

      expect(result[:error]).to be_nil
      # Anchored parse refuses a mid-string match; whole string is escaped instead of
      # slicing as if the tag started at index 0.
      expect(result[:html].to_s).to include("NOTE")
      expect(result[:html].to_s).to include("&lt;%=")
      expect(result[:html].to_s).not_to include("pb_caption_kit")
    end

    it "still parses ERB children when pb_rails is at the start" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {},
        children: '<%= pb_rails("caption", props: { text: "Hi" }) %>',
        structure_mode: "basic"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html].to_s).to include("Hi")
      expect(result[:html].to_s).to include("pb_caption_kit")
    end

    it "escapes raw HTML inside controlled flex item children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: { "flexItemGrow" => true },
        children: "{'<script>alert(1)</script>'}",
        structure_mode: "controlled_flex_item"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).not_to include("<script>")
      expect(result[:html]).to include("&lt;script&gt;")
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

    it "drops URL and path-like icon sources to avoid SSRF" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "icon",
        props: {
          "icon" => "user",
          "customIcon" => "http://169.254.169.254/latest/meta-data/x.svg",
        }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("pb_icon")
      expect(result[:html]).not_to include("169.254.169.254")
      expect(result[:html]).not_to include("meta-data")
    end

    it "still allows plain icon names" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "icon",
        props: { "icon" => "user" }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("pb_icon")
    end

    it "drops unsafe customIcon on nested Icon children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: { "orientation" => "row" },
        children: '<Icon customIcon="http://127.0.0.1/secret.svg" icon="user" />'
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).not_to include("127.0.0.1")
      expect(result[:html]).not_to include("secret.svg")
    end
  end
end
