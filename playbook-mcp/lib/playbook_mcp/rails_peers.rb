# frozen_string_literal: true

module PlaybookMcp
  # Self-contained playbook-rails IIFE under vendor/chart-peers (bin/vendor_chart_peers).
  # Vite `yarn release` does not emit this file; React is bundled in, not external.
  module RailsPeers
    BUNDLE = "playbook-rails.js"

  module_function

    def root
      ChartPeers.root
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
