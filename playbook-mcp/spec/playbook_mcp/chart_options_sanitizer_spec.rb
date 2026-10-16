# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::ChartOptionsSanitizer do
  it "removes useHTML and formatters" do
    options = {
      "title" => { "text" => "Hi", "useHTML" => true },
      "tooltip" => { "formatter" => "function(){}" },
      "series" => [{ "data" => [1, 2], "dataLabels" => { "useHTML" => true } }],
    }
    clean = described_class.sanitize(options)
    expect(clean.dig("title", "useHTML")).to be_nil
    expect(clean.dig("tooltip", "formatter")).to be_nil
    expect(clean.dig("series", 0, "dataLabels", "useHTML")).to be_nil
    expect(clean.dig("title", "text")).to eq("Hi")
  end

  it "strips Highcharts events so only the Playbook click bridge runs" do
    options = { "plotOptions" => { "series" => { "events" => { "click" => "bad()" }, "cursor" => "pointer" } } }
    clean = described_class.sanitize(options)
    expect(clean.dig("plotOptions", "series", "events")).to be_nil
    expect(clean.dig("plotOptions", "series", "cursor")).to eq("pointer")
  end

  it "strips script-like strings" do
    options = { "title" => { "text" => "<script>alert(1)</script>Ok" } }
    clean = described_class.sanitize(options)
    expect(clean.dig("title", "text")).not_to include("<script>")
    expect(clean.dig("title", "text")).to include("Ok")
  end
end
