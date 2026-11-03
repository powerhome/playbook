# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Site health check", type: :request do
  before { host! "localhost" }

  it "preserves the deployment probe response without querying the database" do
    expect(ActiveRecord::Base).not_to receive(:connection)
    get "/health_check/site"
    expect(response).to have_http_status(:ok)
    expect(response.media_type).to eq("text/plain")
    expect(response.body).to eq("success")
    expect(response.headers["Cache-Control"]).to include("must-revalidate", "max-age=1")
  end

  it "responds to HEAD probes" do
    head "/health_check/site"
    expect(response).to have_http_status(:ok)
    expect(response.body).to be_empty
  end

  it "preserves POST and JSON responses" do
    post "/health_check/site.json"
    expect(response).to have_http_status(:ok)
    expect(response.parsed_body).to eq("healthy" => true, "message" => "success")
  end

  it "responds on staging before the catch-all redirect" do
    host! "staging.playbook.powerapp.cloud"
    get "/health_check/site"
    expect(response).to have_http_status(:ok)
    expect(response.body).to eq("success")
  end
end
