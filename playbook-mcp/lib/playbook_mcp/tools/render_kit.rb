# frozen_string_literal: true

require "mcp"
require "mcp_ui_server"
require "securerandom"

module PlaybookMcp
  module Tools
    class RenderKit < MCP::Tool
      tool_name "render_kit"
      description "Render a Playbook kit server-side and return an MCP-UI ui:// HTML resource for inline iframe display."
      input_schema(
        properties: {
          kit: {
            type: "string",
            description: "snake_case kit id (e.g. table, button, card)",
          },
          props: {
            type: "object",
            description: "Kit props (camelCase as in dist/ai schemas)",
          },
          children: {
            type: "string",
            description: "Optional HTML children (e.g. table thead/tbody markup)",
          },
        },
        required: ["kit"]
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(kit:, props: nil, children: nil, server_context: nil) # rubocop:disable Lint/UnusedMethodArgument
          # Fresh Renderer per call — shared ActionView context is not thread-safe.
          html = PlaybookMcp::Renderer.new.render_kit(kit: kit, props: props || {}, children: children)
          ui = McpUiServer.create_ui_resource(
            uri: "ui://playbook/kit/#{kit}/#{SecureRandom.hex(6)}",
            content: { type: :raw_html, htmlString: html }
          )
          MCP::Tool::Response.new([
                                    { type: "text", text: "Rendered Playbook kit '#{kit}'." },
                                    ui,
                                  ])
        rescue PlaybookMcp::ValidationError, PlaybookMcp::RenderError, McpUiServer::Error => e
          MCP::Tool::Response.new([{ type: "text", text: e.message }], error: true)
        end
      end
    end
  end
end
