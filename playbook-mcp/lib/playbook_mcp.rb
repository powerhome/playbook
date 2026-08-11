# frozen_string_literal: true

require "playbook_mcp/version"
require "playbook_mcp/props"
require "playbook_mcp/client_ip"
require "playbook_mcp/html_sanitizer"
require "playbook_mcp/html_postprocess"
require "playbook_mcp/chart_options_sanitizer"
require "playbook_mcp/chart_peers"
require "playbook_mcp/schema_store"
require "playbook_mcp/validator"
require "playbook_mcp/icon_catalog"
require "playbook_mcp/render_store"
require "playbook_mcp/ui_resource"
require "playbook_mcp/document"
require "playbook_mcp/renderer"
require "playbook_mcp/server"
require "playbook_mcp/tools/render_kit"
require "playbook_mcp/tools/render_layout"
require "playbook_mcp/tools/render_chart"
require "playbook_mcp/tools/list_kits"
require "playbook_mcp/tools/list_icons"
require "playbook_mcp/tools/get_kit_schema"

module PlaybookMcp
  class Error < StandardError; end
  class ValidationError < Error; end
  class RenderError < Error; end
end
