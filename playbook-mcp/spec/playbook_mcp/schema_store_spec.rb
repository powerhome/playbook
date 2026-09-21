# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::SchemaStore do
  subject(:store) { described_class.new }

  it "preloads kit schemas so request threads only read" do
    expect(store.schema_for("button")).to include("name" => "Button")
    expect(store.instance_variable_get(:@kit_schemas)).to be_frozen
    expect(store.instance_variable_get(:@playgrounds)).to be_frozen
  end

  it "raises for unknown kits without writing the cache" do
    expect do
      store.schema_for("not_a_real_kit")
    end.to raise_error(PlaybookMcp::ValidationError, /Unknown kit/)
  end

  it "returns playground JSON when present" do
    expect(store.playground_for("button")).to be_a(Hash)
  end

  it "returns nil playground for unknown kits" do
    expect(store.playground_for("not_a_real_kit")).to be_nil
  end
end
