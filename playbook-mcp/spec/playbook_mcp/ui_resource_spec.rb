# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::UiResource do
  around do |example|
    PlaybookMcp::RenderStore.reset_instance!
    example.run
    PlaybookMcp::RenderStore.reset_instance!
  end

  it "returns raw_html when asset base is not an absolute URL" do
    allow(Rails.application.config.playbook_mcp).to receive(:asset_base_url).and_return("")
    ui = described_class.build(uri: "ui://playbook/kit/button/abc", html: "<p>hi<?xml version=\"1.0\"?></p>")
    expect(ui[:type] || ui["type"]).to eq("resource")
    resource = ui[:resource] || ui["resource"]
    expect(resource[:text] || resource["text"]).to include("<p>hi</p>")
    expect(resource[:text] || resource["text"]).not_to include("<?xml")
    expect(resource[:blob] || resource["blob"]).to be_nil
  end

  it "returns external_url when asset base is absolute" do
    allow(Rails.application.config.playbook_mcp).to receive(:asset_base_url).and_return("https://mcp.example.com")
    ui = described_class.build(uri: "ui://playbook/layout/abc", html: "<div>dashboard</div>")
    resource = ui[:resource] || ui["resource"]
    expect(resource[:mimeType] || resource["mimeType"]).to eq("text/uri-list")
    iframe = resource[:text] || resource["text"]
    expect(iframe).to start_with("https://mcp.example.com/ui/")
    id = iframe.split("/ui/").last
    expect(PlaybookMcp::RenderStore.instance.get(id)).to include("dashboard")
  end
end
