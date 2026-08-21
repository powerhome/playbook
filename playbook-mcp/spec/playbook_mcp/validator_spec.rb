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
end
