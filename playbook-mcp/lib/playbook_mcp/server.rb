# frozen_string_literal: true

require "mcp"

module PlaybookMcp
  module Server
  module_function

    def build
      # Do not stash a shared Renderer here — ActionView view_context is not
      # thread-safe, and Puma runs multiple threads (RAILS_MAX_THREADS).
      # Render tools construct a fresh Renderer per call.
      MCP::Server.new(
        name: "playbook-mcp",
        title: "Playbook MCP-UI Render Server",
        version: PlaybookMcp::VERSION,
        instructions: <<~INSTRUCTIONS.squish,
          Render Playbook design-system kits as MCP-UI HTML resources.
          Prefer list_kits / get_kit_schema before rendering an unfamiliar kit — don't guess prop names.
          When a prop type or default is { react, rails }, use the rails entry.
          Use render_layout to compose multiple kits into ONE document (one inline panel);
          render_kit for a single component; render_chart for a chart-only document.
          Chart kits in render_layout hydrate via the same Highcharts mount as render_chart
          (playbook-charts.js once per document).
          Kit ids are snake_case (card, table, icon_stat_value, badge, section_separator, …);
          props are camelCase from the dist/ai schemas.
          Icon names must be valid @powerhome/playbook-icons ids (kebab-case, e.g. chart-line,
          users, cart-shopping, currency-dollar). Call list_icons to discover or filter names —
          unknown icons render as empty circles (no Font Awesome webfont in MCP docs).
          Composition kits (card, table) accept a sanitized HTML children string
          (item-level children, or props.children — equivalent).
          For charts (pb_bar_graph, pb_line_graph, pb_gauge_chart, pb_circle_chart),
          pass the Highcharts config verbatim under props.options — real Highcharts keys
          (series, xAxis, yAxis, title, subtitle); do NOT snake_case the keys inside options.
          Chart point clicks post MCP-UI actions to the host (LibreChat handles prompt, tool, intent).
          Pass uiAction as a sibling of props — not inside Highcharts options, and never as JS:
          { type: "prompt", prompt: "Show details for {{category}}" } (default if omitted),
          { type: "tool", toolName: "render_kit", params: { kit: "card" } },
          { type: "intent", intent: "inspect-point" }, or { type: "none" } to disable.
          Templates: {{category}} {{series}} {{value}} {{name}} {{x}} {{y}}.
        INSTRUCTIONS
        tools: [
          PlaybookMcp::Tools::ListKits,
          PlaybookMcp::Tools::ListIcons,
          PlaybookMcp::Tools::GetKitSchema,
          PlaybookMcp::Tools::RenderKit,
          PlaybookMcp::Tools::RenderLayout,
          PlaybookMcp::Tools::RenderChart,
        ],
        server_context: {}
      )
    end
  end
end
