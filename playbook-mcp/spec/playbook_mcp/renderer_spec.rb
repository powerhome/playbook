# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::Renderer do
  subject(:renderer) { described_class.new }

  it "renders a button document with assets" do
    html = renderer.render_kit(kit: "button", props: { "text" => "Go", "variant" => "secondary" })
    expect(html).to include("pb_button")
    expect(html).to include("/assets/playbook.css?v=")
    expect(html).to include("/assets/playbook-rails.js?v=")
    expect(html).to include("/assets/playbook-mcp-resize.js?v=")
    expect(html).not_to match(/100vh/)
    expect(html).to include("Go")
  end

  it "renders a table with children" do
    children = "<thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody>"
    html = renderer.render_kit(kit: "table", props: { "size" => "sm" }, children: children)
    expect(html).to include("pb_table")
    expect(html).to include("<th>A</th>")
    expect(html).to include("/assets/playbook-mcp-resize.js?v=")
  end

  it "uses the absolute asset origin in CSP (srcdoc 'self' is opaque)" do
    html = PlaybookMcp::Document.new(
      body_html: "<div>ok</div>",
      asset_base_url: "https://mcp-pr6468.example.test",
      charts: false
    ).to_html
    expect(html).to include(%(Content-Security-Policy" content="))
    expect(html).to include("script-src https://mcp-pr6468.example.test")
    expect(html).to include("style-src https://mcp-pr6468.example.test 'unsafe-inline'")
    expect(html).not_to include("script-src 'self'")
    expect(html).not_to include("script-src https://mcp-pr6468.example.test 'unsafe-inline'")
  end

  it "omits CSP when assets are relative (srcdoc cannot use 'self')" do
    html = PlaybookMcp::Document.new(
      body_html: "<div>ok</div>",
      asset_base_url: "",
      charts: false
    ).to_html
    expect(html).not_to include("Content-Security-Policy")
  end

  it "strips dangerous markup from table children" do
    children = %(<thead><tr><th>A</th></tr></thead><tbody><tr><td onclick="alert(1)">1<script>alert(2)</script></td></tr></tbody>)
    html = renderer.render_kit(kit: "table", props: { "size" => "sm" }, children: children)
    table_html = html[%r{<table[\s\S]*?</table>}]
    expect(table_html).not_to include("onclick")
    expect(table_html).not_to include("<script")
    expect(table_html).not_to include("alert(2)")
    expect(table_html).to include("<td>")
  end

  it "renders a layout of multiple kits" do
    html = renderer.render_layout(
      items: [
        { kit: "button", props: { text: "One" } },
        { kit: "card", props: {}, children: "Hello" },
      ]
    )
    expect(html).to include("pb_button")
    expect(html).to include("pb_card")
  end

  it "loads a self-contained chart IIFE and strips useHTML from options" do
    html = renderer.render_kit(
      kit: "pb_bar_graph",
      props: {
        "options" => {
          "title" => { "text" => "Demo", "useHTML" => true },
          "series" => [{ "data" => [1, 2] }],
          "xAxis" => { "categories" => %w[Q1 Q2] },
          "yAxis" => { "title" => { "text" => "USD" } },
        },
      }
    )
    expect(html).not_to include("importmap")
    expect(html).not_to include("type=\"module\"")
    expect(html).not_to include("react.esm.js")
    expect(html).not_to include("esm.sh")
    expect(html).to include("/assets/vendor/playbook-charts.js?v=")
    expect(html).to include("/assets/playbook-mcp-resize.js?v=")
    expect(html).not_to include("playbook-rails-charts-bindings.js")
    expect(html).to include("data-pb-react-component")
    expect(html).not_to include("useHTML")
    # Highcharts options must stay camelCase inside the mount props.
    expect(html).to include("xAxis")
    expect(html).to include("yAxis")
    expect(html).not_to match(/["']x_axis["']/)
    expect(html).not_to match(/["']y_axis["']/)
    # Reserve height before Highcharts hydrates so LibreChat iframe auto-resize fits.
    expect(html).to match(/data-pb-react-component="PbBarGraph"[^>]*style="[^"]*height:400px/)
    expect(html).to include("&quot;chart&quot;:{&quot;height&quot;:400}")
  end
end
