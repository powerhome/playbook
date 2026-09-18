# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::UiAction do
  describe ".resolve" do
    it "defaults charts to a prompt template" do
      action = described_class.resolve(nil)
      expect(action["type"]).to eq("prompt")
      expect(action["prompt"]).to include("{{category}}")
    end

    it "disables when type is none" do
      expect(described_class.resolve({ "type" => "none" })).to be_nil
      expect(described_class.resolve(false)).to be_nil
    end

    it "sanitizes a custom prompt" do
      action = described_class.resolve(
        "type" => "prompt",
        "prompt" => "Drill into {{category}} <script>x</script>"
      )
      expect(action["prompt"]).to include("Drill into {{category}}")
      expect(action["prompt"]).not_to include("<script>")
    end

    it "requires toolName for tool actions" do
      expect { described_class.resolve("type" => "tool") }.to raise_error(PlaybookMcp::ValidationError, /toolName/)
    end

    it "accepts a tool action" do
      action = described_class.resolve(
        "type" => "tool",
        "toolName" => "render_kit",
        "params" => { "kit" => "card", "label" => "{{category}}" }
      )
      expect(action["toolName"]).to eq("render_kit")
      expect(action.dig("params", "label")).to eq("{{category}}")
    end

    it "rejects unknown types" do
      expect { described_class.resolve("type" => "link") }.to raise_error(PlaybookMcp::ValidationError, /type/)
    end
  end

  describe ".from_tool_args" do
    it "reads camelCase or snake_case kwargs" do
      expect(described_class.from_tool_args({ uiAction: { "type" => "none" } })).to eq("type" => "none")
      expect(described_class.from_tool_args({ ui_action: { "type" => "prompt" } })).to eq("type" => "prompt")
      expect(described_class.from_tool_args({})).to be_nil
    end
  end

  describe ".take_from_props" do
    it "strips nested uiAction so kit validation does not see it" do
      props, nested = described_class.take_from_props("text" => "Hi", "uiAction" => { "type" => "none" })
      expect(props).to eq("text" => "Hi")
      expect(nested).to eq("type" => "none")
    end
  end
end
