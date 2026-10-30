# frozen_string_literal: true

require "mcp"

module PlaybookMcp
  module Tools
    class ListIcons < MCP::Tool
      tool_name "list_icons"
      description "List valid Playbook icon names (from @powerhome/playbook-icons). Use these kebab-case ids for icon / icon_stat_value / icon_circle props — unknown names render as empty circles."
      input_schema(
        properties: {
          query: {
            type: "string",
            description: "Optional substring filter (e.g. chart, dollar, user)",
          },
          limit: {
            type: "integer",
            description: "Max names to return (default 100)",
          },
        }
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(query: nil, limit: nil, server_context: nil) # rubocop:disable Lint/UnusedMethodArgument
          unless IconCatalog.available?
            return MCP::Tool::Response.new(
              [{ type: "text", text: "Icon catalog unavailable (icon_path not configured on this server)." }],
              error: true
            )
          end

          lim = limit.nil? ? 100 : Integer(limit)
          lim = 1 if lim < 1
          lim = 500 if lim > 500
          payload = IconCatalog.search(query, limit: lim)
          MCP::Tool::Response.new([{ type: "text", text: JSON.pretty_generate(payload) }])
        rescue ArgumentError => e
          MCP::Tool::Response.new([{ type: "text", text: e.message }], error: true)
        end
      end
    end
  end
end
