# frozen_string_literal: true

require "mcp"
require "mcp_ui_server"
require "securerandom"

module PlaybookMcp
  module Tools
    class RenderChart < MCP::Tool
      TYPE_TO_KIT = {
        "bar" => "pb_bar_graph",
        "line" => "pb_line_graph",
        "circle" => "pb_circle_chart",
        "gauge" => "pb_gauge_chart",
        "pb_bar_graph" => "pb_bar_graph",
        "pb_line_graph" => "pb_line_graph",
        "pb_circle_chart" => "pb_circle_chart",
        "pb_gauge_chart" => "pb_gauge_chart",
      }.freeze

      tool_name "render_chart"
      description "Render an interactive Playbook chart kit (Highcharts mount) as an MCP-UI HTML resource."
      input_schema(
        properties: {
          type: {
            type: "string",
            description: "Chart type or kit id: bar, line, circle, gauge, or pb_bar_graph / pb_line_graph / pb_circle_chart / pb_gauge_chart",
          },
          kit: {
            type: "string",
            description: "Optional explicit kit id (overrides type)",
          },
          props: {
            type: "object",
            description: "Kit props; typically { options: { ...Highcharts options } }",
          },
          options: {
            type: "object",
            description: "Shorthand Highcharts options merged into props.options",
          },
        },
        required: []
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(type: nil, kit: nil, props: nil, options: nil, server_context: nil) # rubocop:disable Lint/UnusedMethodArgument
          resolved = kit.presence || TYPE_TO_KIT[type.to_s]
          unless resolved
            return MCP::Tool::Response.new(
              [{ type: "text", text: "Provide type (bar|line|circle|gauge) or kit (pb_bar_graph|...)." }],
              error: true
            )
          end

          kit_props = (props || {}).dup
          kit_props = kit_props.transform_keys(&:to_s)
          if options
            existing = kit_props["options"] || kit_props[:options] || {}
            kit_props["options"] = existing.merge(Props.deep_stringify_keys(options))
          end

          # Fresh Renderer per call — shared ActionView context is not thread-safe.
          html = PlaybookMcp::Renderer.new.render_kit(kit: resolved, props: kit_props)
          ui = PlaybookMcp::UiResource.build(
            uri: "ui://playbook/chart/#{resolved}/#{SecureRandom.hex(6)}",
            html: html
          )
          MCP::Tool::Response.new([
                                    { type: "text", text: "Rendered Playbook chart '#{resolved}'." },
                                    ui,
                                  ])
        rescue PlaybookMcp::ValidationError, PlaybookMcp::RenderError, McpUiServer::Error => e
          MCP::Tool::Response.new([{ type: "text", text: e.message }], error: true)
        end
      end
    end
  end
end
