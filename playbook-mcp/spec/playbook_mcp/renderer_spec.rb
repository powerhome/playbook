# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::Renderer do
  subject(:renderer) { described_class.new }

  it "renders a button document with assets" do
    html = renderer.render_kit(kit: "button", props: { "text" => "Go", "variant" => "secondary" })
    expect(html).to include("pb_button")
    expect(html).to include("/assets/playbook.css?v=")
    expect(html).to include("/assets/playbook-rails.js?v=")
    expect(html).not_to match(/100vh/)
    expect(html).to include("Go")
  end

  it "renders a table with children" do
    children = "<thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody>"
    html = renderer.render_kit(kit: "table", props: { "size" => "sm" }, children: children)
    expect(html).to include("pb_table")
    expect(html).to include("<th>A</th>")
    expect(html).to include("Content-Security-Policy")
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

  it "uses self-hosted chart peers and strips useHTML from options" do
    html = renderer.render_kit(
      kit: "pb_bar_graph",
      props: {
        "options" => {
          "title" => { "text" => "Demo", "useHTML" => true },
          "series" => [{ "data" => [1, 2] }],
        },
      }
    )
    expect(html).to include("importmap")
    expect(html).to include("/assets/vendor/react.esm.js?v=")
    expect(html).not_to include("esm.sh")
    expect(html).to include("playbook-rails-charts-bindings.js")
    expect(html).to include("data-pb-react-component")
    expect(html).not_to include("useHTML")
  end
end
