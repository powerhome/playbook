# frozen_string_literal: true

class HealthController < ActionController::Base
  def show
    render json: { status: "ok", service: "playbook-mcp", version: PlaybookMcp::VERSION }, status: :ok
  end
end
