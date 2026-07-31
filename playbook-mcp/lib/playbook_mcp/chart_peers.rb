# frozen_string_literal: true

module PlaybookMcp
  # Self-hosted chart peer modules (React / Highcharts) under vendor/chart-peers.
  # Populate with: bin/vendor_chart_peers
  module ChartPeers
    FILES = {
      "react" => "react.esm.js",
      "react-dom" => "react-dom.esm.js",
      "react/jsx-runtime" => "react-jsx-runtime.esm.js",
      "highcharts" => "highcharts.esm.js",
      "highcharts-react-official" => "highcharts-react-official.esm.js",
      "highcharts/highcharts-more" => "highcharts-more.esm.js",
      "highcharts/modules/solid-gauge" => "solid-gauge.esm.js",
    }.freeze

  module_function

    def root
      Rails.root.join("vendor/chart-peers")
    end

    def path_for(filename)
      root.join(filename)
    end

    def available?
      FILES.values.all? { |filename| path_for(filename).file? }
    end

    def missing
      FILES.values.reject { |filename| path_for(filename).file? }
    end

    def import_map_entries(asset_url_builder)
      FILES.transform_values { |filename| asset_url_builder.call("vendor/#{filename}") }
    end
  end
end
