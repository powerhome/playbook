# frozen_string_literal: true

# The deployment's site probe checks Rails availability, not database readiness.
class HealthChecksController < ActionController::Base
  def site
    response.headers["Cache-Control"] = "must-revalidate, max-age=1"
    respond_to do |format|
      format.json { render json: { healthy: true, message: "success" } }
      format.any { render plain: "success" }
    end
  end
end
