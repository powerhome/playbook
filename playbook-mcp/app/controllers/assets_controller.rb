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
    return nil unless safe_relative_path?(relative)

    relative = Pathname.new(relative).cleanpath.to_s
    return nil unless safe_relative_path?(relative)

    if relative.start_with?("vendor/")
      filename = relative.delete_prefix("vendor/")
      return nil unless filename.match?(/\A[A-Za-z0-9._-]+\z/)

      resolve_under(PlaybookMcp::ChartPeers.root, filename)
    elsif relative.start_with?("fonts/")
      rest = relative.delete_prefix("fonts/")
      return nil if rest.blank?

      # Fonts may live under Engine.root/fonts or dist/fonts — never join
      # the caller path under Engine.root itself.
      resolve_under(Playbook::Engine.root.join("fonts"), rest) ||
        resolve_under(Playbook::Engine.root.join("dist", "fonts"), rest)
    else
      return nil unless dist_allowlisted?(relative)

      resolve_under(Playbook::Engine.root.join("dist"), relative)
    end
  end

  def safe_relative_path?(relative)
    return false if relative.blank?
    return false if relative.include?("\0")
    return false if relative.include?("..")
    return false if relative.start_with?("/", "\\")
    return false unless relative.match?(%r{\A[A-Za-z0-9._/-]+\z})

    true
  end

  def dist_allowlisted?(relative)
    DIST_PREFIXES.any? do |prefix|
      if prefix.end_with?("/")
        relative.start_with?(prefix)
      else
        relative == prefix
      end
    end
  end

  # Resolve +realpath+ under +root+ only. Containment uses a trailing separator
  # so "/tmp/foo" does not match root "/tmp/foobar".
  def resolve_under(root, relative)
    return nil if relative.blank?
    return nil unless safe_relative_path?(relative)
    return nil unless root&.directory?

    root = root.realpath
    absolute = root.join(relative).cleanpath
    return nil unless absolute.file?

    abs = absolute.realpath.to_s
    root_s = root.to_s
    return nil unless abs == root_s || abs.start_with?("#{root_s}/")

    absolute
  rescue Errno::ENOENT
    nil
  end

  def content_type_for(path)
    CONTENT_TYPES[File.extname(path).downcase] || "application/octet-stream"
  end
end
