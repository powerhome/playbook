# frozen_string_literal: true

require "digest"

class AssetsController < ActionController::Base
  # MCP-UI sandboxed iframes often have an opaque origin (Origin: null) when
  # allow-same-origin is omitted. CSS/JS <link>/<script> still load, but web
  # fonts are CORS-restricted — without ACAO: * Proxima/Power Centra fall back
  # to system fonts. skip_forgery + permissive CORS are intentional here.
  skip_forgery_protection

  DIST_PREFIXES = [
    "playbook.css",
    "reset.css",
    "playbook-rails.js",
    "playbook-rails-react-bindings.js",
    "playbook-rails-charts-bindings.js",
    "playbook-charts.js",
    "charts.js",
    "chunks/",
    "fonts/",
  ].freeze

  CONTENT_TYPES = {
    ".css" => "text/css; charset=utf-8",
    ".js" => "application/javascript; charset=utf-8",
    ".mjs" => "application/javascript; charset=utf-8",
    ".map" => "application/json",
    ".woff" => "font/woff",
    ".woff2" => "font/woff2",
    ".ttf" => "font/ttf",
    ".otf" => "font/otf",
    ".eot" => "application/vnd.ms-fontobject",
    ".svg" => "image/svg+xml",
  }.freeze

  def show
    relative = params[:path].to_s
    relative = "#{relative}.#{params[:format]}" if params[:format].present? && !relative.end_with?(".#{params[:format]}")

    absolute = resolve_file(relative)
    unless absolute
      head :not_found
      return
    end

    apply_cors_headers!
    # Gem-version-keyed caching so LibreChat iframes pick up Playbook upgrades.
    response.set_header("Cache-Control", "public, max-age=3600")
    response.set_header("ETag", %("#{Playbook::VERSION}-#{Digest::SHA256.file(absolute).hexdigest[0, 16]}"))
    send_file absolute, type: content_type_for(absolute), disposition: "inline"
  end

  # Browser font preflights from opaque-origin iframes.
  def preflight
    apply_cors_headers!
    response.set_header("Access-Control-Max-Age", "86400")
    head :no_content
  end

private

  def apply_cors_headers!
    response.set_header("Access-Control-Allow-Origin", "*")
    response.set_header("Access-Control-Allow-Methods", "GET, OPTIONS")
    response.set_header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type")
    response.set_header("Cross-Origin-Resource-Policy", "cross-origin")
    response.set_header("Timing-Allow-Origin", "*")
  end

  def resolve_file(relative)
    if relative.start_with?("vendor/")
      return nil unless relative.match?(%r{\Avendor/[A-Za-z0-9._-]+\z})

      root = PlaybookMcp::ChartPeers.root
      return nil unless root.directory?

      root = root.realpath
      absolute = root.join(relative.delete_prefix("vendor/"))
      return nil unless absolute.file? && absolute.realpath.to_s.start_with?(root.to_s)

      absolute
    else
      return nil unless DIST_PREFIXES.any? { |prefix| relative == prefix.delete_suffix("/") || relative.start_with?(prefix) }

      candidates = []
      candidates << Playbook::Engine.root.join("dist", relative)
      # Gemspec ships fonts/** — may live beside dist, not under it.
      candidates << Playbook::Engine.root.join(relative) if relative.start_with?("fonts/")
      candidates << Playbook::Engine.root.join("dist", relative)

      candidates.uniq.each do |absolute|
        next unless absolute.file?

        root = absolute.dirname
        # Containment: must stay under Engine.root
        engine_root = Playbook::Engine.root.realpath.to_s
        next unless absolute.realpath.to_s.start_with?(engine_root)

        return absolute
      end
      nil
    end
  end

  def content_type_for(path)
    CONTENT_TYPES[File.extname(path).downcase] || "application/octet-stream"
  end
end
