# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::SchemaStore do
  subject(:store) { described_class.new }

  it "preloads kit schemas so request threads only read" do
    expect(store.schema_for("button")).to include("name" => "Button")
    expect(store.instance_variable_get(:@kit_schemas)).to be_frozen
    expect(store.instance_variable_get(:@playgrounds)).to be_frozen
    expect(store.instance_variable_get(:@chart_kit_ids)).to be_frozen
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

  it "detects chart kits from dist/ai metadata rather than kit-id names" do
    expect(store.chart_kit?("pb_bar_graph")).to be(true)
    expect(store.chart_kit?("pb_line_graph")).to be(true)
    expect(store.chart_kit?("pb_circle_chart")).to be(true)
    expect(store.chart_kit?("pb_gauge_chart")).to be(true)
    expect(store.chart_kit?("button")).to be(false)
    expect(store.chart_kit?("table")).to be(false)
  end

  it "treats playbook-ui/charts imports, charts_import hints, and highcharts peers as chart kits" do
    expect(
      described_class.chart_metadata?(
        playground: { "externalImports" => ["import { PbBarGraph } from 'playbook-ui/charts'"] }
      )
    ).to be(true)
    expect(
      described_class.chart_metadata?(playground: { "hints" => { "charts_import" => { "type" => "info" } } })
    ).to be(true)
    expect(
      described_class.chart_metadata?(
        schema: { "externalDependencies" => { "packages" => ["highcharts"] } }
      )
    ).to be(true)
    expect(
      described_class.chart_metadata?(
        playground: { "externalImports" => ["import { useState } from 'react'"] }
      )
    ).to be(false)
  end
end
