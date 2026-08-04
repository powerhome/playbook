# frozen_string_literal: true

module PlaybookMcp
  # Self-contained chart IIFE under vendor/chart-peers (bin/vendor_chart_peers).
  module ChartPeers
    BUNDLE = "playbook-charts.js"

  module_function

    def root
      Rails.root.join("vendor/chart-peers")
    end

    def bundle_path
      root.join(BUNDLE)
    end

    def available?
      bundle_path.file? && bundle_path.size.positive?
    end

    def missing
      available? ? [] : [BUNDLE]
    end

    def asset_relative_path
      "vendor/#{BUNDLE}"
    end
  end
end
