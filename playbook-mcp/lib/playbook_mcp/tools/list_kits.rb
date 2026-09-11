# frozen_string_literal: true

require "mcp"
require "json"

module PlaybookMcp
  module Tools
    class ListKits < MCP::Tool
      tool_name "list_kits"
      description "List Playbook kits available for server-side rails rendering via this MCP server."
      input_schema(
        properties: {
          platform: {
            type: "string",
            description: "Filter by platform (default: rails)",
          },
          category: {
            type: "string",
            description: "Optional category filter from kitMeta",
          },
        },
        required: []
      )
      annotations(read_only_hint: true, destructive_hint: false, open_world_hint: false)

      class << self
        def call(platform: "rails", category: nil, server_context: nil) # rubocop:disable Lint/UnusedMethodArgument
          store = SchemaStore.instance
          meta = store.kit_meta
          kits = store.kit_ids.filter_map do |id|
            info = meta[id] || {}
            schema = begin
              store.schema_for(id)
            rescue ValidationError
              next
            end
            platforms = schema["platforms"] || info["platforms"] || []
            next if platform.present? && !platforms.include?(platform.to_s)

            kit_category = schema["category"] || info["category"]
            next if category.present? && kit_category.to_s != category.to_s

            {
              id: id,
              name: schema["name"] || info["name"] || id,
              category: kit_category,
              status: schema["status"] || info["status"],
              platforms: platforms,
            }
          end

          MCP::Tool::Response.new([{
                                    type: "text",
                                    text: JSON.pretty_generate({ count: kits.size, kits: kits }),
                                  }])
        end
      end
    end
  end
end
