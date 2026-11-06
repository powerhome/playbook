# frozen_string_literal: true

class UiController < ActionController::Base
  # Served into LibreChat MCP-UI iframes via external_url (not srcdoc). Must be
  # frameable cross-origin; skip CSRF (GET-only HTML documents).
  skip_forgery_protection

  def show
    html = PlaybookMcp::RenderStore.instance.get(params[:id])
    if html.blank?
      render plain: "Playbook MCP render expired or not found. Re-run the render tool.",
             status: :not_found,
             content_type: "text/plain; charset=utf-8"
      return
    end

    # Allow LibreChat (and other hosts) to frame this document. Prefer CSP;
    # clear Rails' default X-Frame-Options: SAMEORIGIN.
    response.delete_header("X-Frame-Options")
    response.set_header("Content-Security-Policy", "frame-ancestors *")
    response.set_header("Cache-Control", "private, no-store")
    render html: html.html_safe, layout: false, content_type: "text/html; charset=utf-8"
  end
end
