# frozen_string_literal: true

require "mcp"
require "mcp_ui_server"
require "securerandom"

module PlaybookMcp
  module Tools
    class RenderLayout < MCP::Tool
      tool_name "render_layout"
      description "Compose and render multiple Playbook kits into one MCP-UI HTML document."
      input_schema(
        properties: {
          items: {
            type: "array",
            description: "Ordered kit specs",
            items: {
              type: "object",
              properties: {
                kit: { type: "string" },
                props: { type: "object" },
                children: { type: "string" },
              },
              required: ["kit"],
            },
          },
        },
        required: ["items"]
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(items:, server_context: nil) # rubocop:disable Lint/UnusedMethodArgument
          # Fresh Renderer per call — shared ActionView context is not thread-safe.
          html = PlaybookMcp::Renderer.new.render_layout(items: items)
          ui = McpUiServer.create_ui_resource(
            uri: "ui://playbook/layout/#{SecureRandom.hex(6)}",
            content: { type: :raw_html, htmlString: html }
          )
          MCP::Tool::Response.new([
                                    { type: "text", text: "Rendered Playbook layout (#{Array(items).size} kits)." },
                                    ui,
                                  ])
        rescue PlaybookMcp::ValidationError, PlaybookMcp::RenderError, McpUiServer::Error => e
          MCP::Tool::Response.new([{ type: "text", text: e.message }], error: true)
        end
      end
    end
  end
end
