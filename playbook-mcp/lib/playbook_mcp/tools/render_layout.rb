# frozen_string_literal: true

require "mcp"
require "mcp_ui_server"
require "securerandom"

module PlaybookMcp
  module Tools
    class RenderLayout < MCP::Tool
      tool_name "render_layout"
      description "Compose and render multiple Playbook kits into one MCP-UI HTML document. Chart items may set uiAction for point-click follow-ups."
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
                uiAction: {
                  type: "object",
                  description: "Chart click action (prompt|tool|intent|none). Overrides the layout uiAction for this item.",
                },
              },
              required: ["kit"],
            },
          },
          uiAction: {
            type: "object",
            description: "Default chart click action for items that do not set their own uiAction.",
          },
        },
        required: ["items"]
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(items:, server_context: nil, **args) # rubocop:disable Lint/UnusedMethodArgument
          # Fresh Renderer per call — shared ActionView context is not thread-safe.
          html = PlaybookMcp::Renderer.new.render_layout(
            items: items,
            ui_action: UiAction.from_tool_args(args)
          )
          ui = PlaybookMcp::UiResource.build(
            uri: "ui://playbook/layout/#{SecureRandom.hex(6)}",
            html: html
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
