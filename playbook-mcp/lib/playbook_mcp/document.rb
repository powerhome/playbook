# frozen_string_literal: true

require "erb"
require "json"
require "uri"

module PlaybookMcp
  class Document
    CHART_KITS = %w[pb_bar_graph pb_line_graph pb_circle_chart pb_gauge_chart].freeze

    def initialize(body_html:, asset_base_url: nil, charts: false, title: "Playbook")
      @body_html = body_html
      @asset_base_url = (asset_base_url.presence || Rails.application.config.playbook_mcp.asset_base_url).to_s.chomp("/")
      @charts = charts
      @title = title
    end

    def to_html
      # Keep free of 100vh / fixed viewport heights — LibreChat auto-resizes
      # the MCP-UI iframe to content height; fixed heights clip.
      <<~HTML
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          #{csp_meta}
          <title>#{ERB::Util.html_escape(@title)}</title>
          <link rel="stylesheet" href="#{asset_url('playbook.css')}" />
          #{import_map if @charts && ChartPeers.available?}
        </head>
        <body style="margin:0;padding:16px;background:#fff;">
          #{@body_html}
          <script src="#{asset_url('playbook-rails.js')}"></script>
          #{chart_scripts if @charts}
        </body>
        </html>
      HTML
    end

    def self.charts_kit?(kit)
      CHART_KITS.include?(kit.to_s)
    end

  private

    def asset_url(path)
      # Version-stamp so sandboxed iframes bust cache across Playbook releases.
      stamped = "#{path}?v=#{ERB::Util.url_encode(Playbook::VERSION)}"
      base = @asset_base_url
      base.empty? ? "/assets/#{stamped}" : "#{base}/assets/#{stamped}"
    end

    # LibreChat mounts ui:// HTML in a srcdoc iframe (opaque origin). CSP 'self'
    # matches nothing there, so absolute asset URLs must name their origin
    # explicitly. If we have no absolute asset base, omit CSP — sandbox isolates.
    def csp_meta
      origin = asset_origin
      return "" if origin.blank?

      content = [
        "default-src 'none'",
        "base-uri 'none'",
        "img-src #{origin} data:",
        "font-src #{origin} data:",
        "style-src #{origin} 'unsafe-inline'",
        # importmap is an inline <script>; srcdoc CSP needs unsafe-inline (or a nonce).
        "script-src #{origin} 'unsafe-inline'",
        "connect-src #{origin}",
      ].join("; ")

      %(<meta http-equiv="Content-Security-Policy" content="#{content}" />)
    end

    def asset_origin
      return "" if @asset_base_url.blank?

      uri = URI.parse(@asset_base_url)
      return "" if uri.scheme.blank? || uri.host.blank?

      origin = "#{uri.scheme}://#{uri.host}"
      origin += ":#{uri.port}" if uri.port && ![80, 443].include?(uri.port)
      origin
    rescue URI::InvalidURIError
      ""
    end

    def import_map
      imports = ChartPeers.import_map_entries(method(:asset_url))
      <<~HTML
        <script type="importmap">
        #{JSON.pretty_generate({ 'imports' => imports })}
        </script>
      HTML
    end

    def chart_scripts
      unless ChartPeers.available?
        missing = ChartPeers.missing.join(", ")
        return <<~HTML
          <!-- Chart peers missing (#{ERB::Util.html_escape(missing)}). Run bin/vendor_chart_peers. -->
          <p style="font:14px sans-serif;color:#666;">
            Chart interactivity unavailable: vendor chart peers are not installed.
          </p>
        HTML
      end

      <<~HTML
        <script type="module" src="#{asset_url('playbook-rails-react-bindings.js')}"></script>
        <script type="module" src="#{asset_url('playbook-rails-charts-bindings.js')}"></script>
      HTML
    end
  end
end
