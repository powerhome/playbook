# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::IconResolver do
  before do
    skip "icon_path not configured" unless PlaybookMcp::IconCatalog.available?
  end

  it "keeps valid playbook-icons names" do
    expect(described_class.resolve("chart-line")).to eq("chart-line")
  end

  it "applies aliases from playbook-icons" do
    expect(described_class.resolve("shopping-cart")).to eq("cart-shopping")
    expect(described_class.resolve("dollar-sign")).to eq("currency-dollar")
  end

  it "remaps common LLM / FA names" do
    expect(described_class.resolve("trending-up")).to eq("chart-line-up")
    expect(described_class.resolve("percentage")).to eq("percent")
    expect(described_class.resolve("fa-users")).to eq("users")
  end

  it "normalizes underscores and falls back instead of inventing FA classes" do
    expect(described_class.resolve("chart_line")).to eq("chart-line")
    expect(described_class.resolve("not-a-real-icon-xyz")).to eq(described_class::DEFAULT_ICON)
  end

  it "rewrites icon keys nested in props" do
    props = {
      "icon" => "trending-up",
      "nested" => { "icon" => "mail" },
      "items" => [{ "icon" => "settings" }],
    }
    out = described_class.apply(props)
    expect(out["icon"]).to eq("chart-line-up")
    expect(out.dig("nested", "icon")).to eq("envelope")
    expect(out.dig("items", 0, "icon")).to eq("cog")
  end

  it "renders remapped icons as SVG, not empty FA circles" do
    html = PlaybookMcp::Renderer.new.render_kit(
      kit: "icon_stat_value",
      props: { "icon" => "trending-up", "text" => "Growth", "value" => 1 },
      wrap_document: false
    )
    expect(html).to include("<svg")
    expect(html).not_to include("fa-trending-up")
  end
end
