# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::Validator do
  subject(:validator) { described_class.new }

  it "accepts a valid button" do
    result = validator.validate_kit!(kit: "button", props: { "text" => "Hi", "variant" => "primary" })
    expect(result.ok?).to be(true)
  end

  it "rejects react-only function props" do
    result = validator.validate_kit!(kit: "button", props: { "onClick" => "x" })
    expect(result.ok?).to be(false)
    expect(result.errors.join).to include("onClick")
  end

  it "enforces button count conditional" do
    result = validator.validate_kit!(kit: "button", props: { "count" => 3, "variant" => "primary" })
    expect(result.ok?).to be(false)
    expect(result.errors.join).to match(/count|reaction/i)
  end

  it "allows reaction count" do
    result = validator.validate_kit!(kit: "button", props: { "count" => 3, "variant" => "reaction" })
    expect(result.ok?).to be(true)
  end

  it "rejects unknown kits" do
    result = validator.validate_kit!(kit: "not_a_real_kit", props: {})
    expect(result.ok?).to be(false)
  end

  it "rejects HTML children on kits that do not allow them" do
    result = validator.validate_kit!(kit: "button", props: { "text" => "Hi" }, children: "<b>x</b>")
    expect(result.ok?).to be(false)
    expect(result.errors.join).to include("does not allow HTML children")
  end

  it "allows HTML children on table" do
    result = validator.validate_kit!(
      kit: "table",
      props: { "size" => "sm" },
      children: "<thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody>"
    )
    expect(result.ok?).to be(true)
  end

  it "rejects a JSON string for object props such as chart options" do
    options = '{"series":[{"data":[1,2]}]}'
    result = validator.validate_kit!(kit: "pb_bar_graph", props: { "options" => options })
    expect(result.ok?).to be(false)
    expect(result.errors.join).to include("Prop 'options' must be an object")
  end

  it "accepts a Hash for chart options" do
    result = validator.validate_kit!(kit: "pb_bar_graph", props: { "options" => { "series" => [{ "data" => [1, 2] }] } })
    expect(result.ok?).to be(true)
  end

  describe "layout limits" do
    let(:caption) { { "kit" => "caption", "props" => { "text" => "x" * 40 } } }

    it "rejects a layout whose combined payload exceeds the cap even when each item fits" do
      allow(Rails.application.config.playbook_mcp).to receive(:max_props_bytes).and_return(100)
      expect(validator.validate_kit!(kit: "caption", props: caption["props"]).ok?).to be(true)

      result = validator.validate_layout!(items: [caption, caption, caption])
      expect(result.ok?).to be(false)
      expect(result.errors.join).to include("Layout payload exceeds max size of 100 bytes")
    end

    it "counts HTML children toward the combined payload" do
      allow(Rails.application.config.playbook_mcp).to receive(:max_props_bytes).and_return(100)
      table = { "kit" => "table", "props" => {}, "children" => "<tbody>#{'<tr><td>1</td></tr>' * 4}</tbody>" }

      result = validator.validate_layout!(items: [table, table])
      expect(result.ok?).to be(false)
      expect(result.errors.join).to include("Layout payload exceeds")
    end

    it "rejects more items than PLAYBOOK_MCP_MAX_LAYOUT_ITEMS" do
      allow(Rails.application.config.playbook_mcp).to receive(:max_layout_items).and_return(2)

      result = validator.validate_layout!(items: Array.new(3) { { "kit" => "caption", "props" => { "text" => "a" } } })
      expect(result.ok?).to be(false)
      expect(result.errors.join).to include("layout has 3 items; max is 2")
    end

    it "accepts a layout within both limits" do
      result = validator.validate_layout!(items: [caption, caption])
      expect(result.ok?).to be(true)
    end
  end

  it "uses the rails type when schema type is split by platform" do
    result = validator.validate_kit!(kit: "stat_value", props: { "value" => 42 })
    expect(result.ok?).to be(true)

    result = validator.validate_kit!(kit: "stat_value", props: { "value" => "42" })
    expect(result.ok?).to be(false)
    expect(result.errors.join).to include("must be a number")
  end
end
