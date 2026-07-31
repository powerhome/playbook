# frozen_string_literal: true

require "mcp"

module PlaybookMcp
  module Server
  module_function

    def build
      renderer = PlaybookMcp::Renderer.new

      MCP::Server.new(
        name: "playbook-mcp",
        title: "Playbook MCP-UI Render Server",
        version: PlaybookMcp::VERSION,
        instructions: "Render Playbook design-system kits as MCP-UI HTML resources for LibreChat and other MCP-UI hosts. Prefer list_kits / get_kit_schema before render_kit. Kit ids are snake_case. Props use camelCase from dist/ai schemas. Do not depend on UI Actions.",
        tools: [
          PlaybookMcp::Tools::ListKits,
          PlaybookMcp::Tools::GetKitSchema,
          PlaybookMcp::Tools::RenderKit,
          PlaybookMcp::Tools::RenderLayout,
          PlaybookMcp::Tools::RenderChart,
        ],
        server_context: { renderer: renderer }
      )
    end
  end
end
