# frozen_string_literal: true

require "mcp"
require "json"

module PlaybookMcp
  module Tools
    class GetKitSchema < MCP::Tool
      tool_name "get_kit_schema"
      description "Return dist/ai kit schema plus slim playground metadata (conditionals, hints, structureModes) for a kit."
      input_schema(
        properties: {
          kit: {
            type: "string",
            description: "snake_case kit id",
          },
        },
        required: ["kit"]
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(kit:, server_context: nil) # rubocop:disable Lint/UnusedMethodArgument
          store = SchemaStore.instance
          schema = store.schema_for(kit)
          playground = store.playground_for(kit)
          payload = {
            kit: kit.to_s,
            schema: schema,
            playground: playground,
            globalProps: schema["globalProps"] ? store.global_props : nil,
          }
          MCP::Tool::Response.new([{ type: "text", text: JSON.pretty_generate(payload) }])
        rescue PlaybookMcp::ValidationError => e
          MCP::Tool::Response.new([{ type: "text", text: e.message }], error: true)
        end
      end
    end
  end
end
