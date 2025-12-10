# frozen_string_literal: true

module Playbook
  module PbKitHelper
    include ::Playbook::PbFormsHelper

    def pb_rails(kit_name, props: {}, &block)
      kit = Playbook::KitResolver.resolve(kit_name.to_s)

      if respond_to? :render_component
        render_component kit.new(props, &block), &block
      else
        render kit.new(props, &block), &block
      end
    end

    def deprecated_kit_warning(kit_name, message = nil)
      # Skip in test and production environments
      return "".html_safe if Rails.env.test? || Rails.env.production?

      # Build the warning message
      base_message = "PLAYBOOK DEPRECATION WARNING\\n  ----------------------------\\n  The \\\"#{kit_name}\\\" kit is deprecated and will be removed in a future version."

      full_message = if message
                       "#{base_message} #{message}"
                     else
                       "#{base_message} Please migrate to the recommended alternative"
                     end

      # Escape the message for JavaScript
      escaped_message = full_message.gsub("'", "\\\\'").gsub("\n", "\\n")

      # Return a self-executing script that checks if we're already warned
      # Uses client-side tracking to ensure one warning per page load
      # Only shows warnings on localhost (matching React behavior)
      script = "<script type=\"text/javascript\">\n"
      script += "(function() {\n"
      script += "  var hostname = window.location.hostname;\n"
      script += "  var isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local') || hostname.includes('local.') || !hostname;\n"
      script += "  if (!isLocalDev) return;\n"
      script += "  if (!window.__PB_WARNED_KITS__) window.__PB_WARNED_KITS__ = new Set();\n"
      script += "  if (!window.__PB_WARNED_KITS__.has('#{kit_name}')) {\n"
      script += "    window.__PB_WARNED_KITS__.add('#{kit_name}');\n"
      script += "    console.warn('#{escaped_message}');\n"
      script += "  }\n"
      script += "})();\n"
      script += "</script>"

      script.html_safe
    end
  end
end
