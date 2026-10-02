# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::Props do
  it "snake_cases kit prop names" do
    props = described_class.to_kit_props("marginBottom" => "md", "text" => "Hi")
    expect(props).to eq(margin_bottom: "md", text: "Hi")
  end

  it "preserves Highcharts options key casing" do
    props = described_class.to_kit_props(
      "chartData" => [{ "fooBar" => 1 }],
      "options" => {
        "xAxis" => { "categories" => %w[Q1 Q2] },
        "yAxis" => { "title" => { "text" => "USD" } },
        "series" => [{ "name" => "NA", "data" => [1, 2] }],
      }
    )

    expect(props[:chart_data]).to eq([{ foo_bar: 1 }])
    expect(props[:options]).to eq(
      "xAxis" => { "categories" => %w[Q1 Q2] },
      "yAxis" => { "title" => { "text" => "USD" } },
      "series" => [{ "name" => "NA", "data" => [1, 2] }]
    )
  end
end
