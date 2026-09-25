# frozen_string_literal: true

require "mcp"
require "mcp_ui_server"
require "securerandom"

module PlaybookMcp
  module Tools
    class RenderLayout < MCP::Tool
      tool_name "render_layout"
      description <<~DESC.squish
        Compose and render multiple Playbook kits into one MCP-UI HTML document.
        Chart kits (playbook-ui/charts / Highcharts, e.g. pb_bar_graph) hydrate via the
        same playbook-charts.js mount as render_chart — included once per document.
        Pass Highcharts config under props.options with real Highcharts keys
        (series, xAxis, yAxis, title) — do not snake_case keys inside options.
        Chart items may set uiAction for point-click follow-ups.
        Composition kits (card, table) accept HTML children as an item-level string,
        or nested under props.children (equivalent).
      DESC
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
                children: {
                  type: "string",
                  description: "HTML children for composition kits (card, table). Equivalent to props.children.",
                },
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
