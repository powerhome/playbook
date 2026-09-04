# frozen_string_literal: true

require "spec_helper"

RSpec.describe "MCP tools" do
  def deliver(args)
    JSON.parse(JSON.generate(args), symbolize_names: true)
  end

  it "list_kits returns rails kits" do
    response = PlaybookMcp::Tools::ListKits.call(**deliver(platform: "rails"), server_context: nil)
    payload = JSON.parse(response.content.first[:text])
    expect(payload["count"]).to be > 50
    expect(payload["kits"].map { |k| k["id"] }).to include("table", "button")
  end

  it "get_kit_schema returns schema and playground" do
    response = PlaybookMcp::Tools::GetKitSchema.call(**deliver(kit: "button"), server_context: nil)
    payload = JSON.parse(response.content.first[:text])
    expect(payload.dig("schema", "name")).to eq("Button")
    expect(payload["playground"]).to be_a(Hash)
  end

  it "render_kit returns a ui resource" do
    response = PlaybookMcp::Tools::RenderKit.call(
      **deliver(kit: "table", props: { size: "sm" }, children: "<thead><tr><th>X</th></tr></thead><tbody><tr><td>1</td></tr></tbody>"),
      server_context: nil
    )
    expect(response.error?).to be(false)
    ui = response.content.find { |c| (c[:type] || c["type"]) == "resource" }
    expect(ui.dig(:resource, :uri) || ui.dig("resource", "uri")).to start_with("ui://playbook/kit/table/")
  end

  it "list_icons returns playbook-icons names" do
    skip "icon_path not configured" unless PlaybookMcp::IconCatalog.available?

    response = PlaybookMcp::Tools::ListIcons.call(**deliver(query: "chart"), server_context: nil)
    expect(response.error?).to be(false)
    payload = JSON.parse(response.content.first[:text])
    expect(payload["icons"]).to include("chart-line")
  end

  it "icon_stat_value inlines SVG without XML prolog" do
    skip "icon_path not configured" unless PlaybookMcp::IconCatalog.available?

    html = PlaybookMcp::Renderer.new.render_kit(
      kit: "icon_stat_value",
      props: { "icon" => "chart-line", "text" => "Revenue", "value" => 1 }
    )
    expect(html).to include("<svg")
    expect(html).not_to include("<?xml")
  end

  it "render_chart maps bar to pb_bar_graph" do
    response = PlaybookMcp::Tools::RenderChart.call(
      **deliver(type: "bar", options: { series: [{ data: [1, 2, 3] }] }),
      server_context: nil
    )
    expect(response.error?).to be(false)
    ui = response.content.find { |c| (c[:type] || c["type"]) == "resource" }
    expect(ui.dig(:resource, :uri) || ui.dig("resource", "uri")).to include("pb_bar_graph")
  end
end
