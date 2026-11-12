# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Website deployment health check", type: :request do
  it "responds successfully at the readiness and liveness probe URL" do
    host! "localhost"
    get "/health_check/site"

    expect(response).to have_http_status(:ok)
    expect(response.media_type).to eq("text/plain")
    expect(response.body.strip).to eq("success")
  end
end
