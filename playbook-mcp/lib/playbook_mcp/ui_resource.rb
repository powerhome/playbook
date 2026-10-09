# frozen_string_literal: true

require "mcp_ui_server"
require "uri"

module PlaybookMcp
  module UiResource
  module_function

    # Prefer external_url when we have an absolute public origin so hosts do not
    # have to carry the full HTML (with inlined icon SVGs) through the MCP tool
    # result — that path is what gets truncated. Fall back to raw_html for local
    # smoke tests without PLAYBOOK_MCP_ASSET_BASE_URL.
    def build(uri:, html:)
      cleaned = HtmlPostprocess.clean(html)
      base = public_base_url
      if base
        id = RenderStore.instance.put(cleaned)
        McpUiServer.create_ui_resource(
          uri: uri,
          content: { type: :external_url, iframeUrl: "#{base}/ui/#{id}" }
        )
      else
        McpUiServer.create_ui_resource(
          uri: uri,
          content: { type: :raw_html, htmlString: cleaned }
        )
      end
    end

    def public_base_url
      base = Rails.application.config.playbook_mcp.asset_base_url.to_s.chomp("/")
      return nil if base.blank?

      uri = URI.parse(base)
      return nil unless uri.is_a?(URI::HTTP) && uri.host.present?

      base
    rescue URI::InvalidURIError
      nil
    end
  end
end
