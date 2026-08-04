# frozen_string_literal: true

require "spec_helper"

RSpec.describe "Assets", type: :request do
  it "serves playbook.css with permissive CORS (opaque-origin iframes / fonts)" do
    get "/assets/playbook.css"
    expect(response).to have_http_status(:ok)
    expect(response.media_type).to eq("text/css")
    expect(response.body.bytesize).to be > 1000
    expect(response.headers["Access-Control-Allow-Origin"]).to eq("*")
    expect(response.headers["Cross-Origin-Resource-Policy"]).to eq("cross-origin")
    expect(response.headers["ETag"]).to be_present
  end

  it "serves playbook-rails.js cross-origin" do
    get "/assets/playbook-rails.js"
    expect(response).to have_http_status(:ok)
    expect(response.headers["Access-Control-Allow-Origin"]).to eq("*")
    expect(response.body).to include("__defProp")
  end

  it "answers OPTIONS preflight for font/CORS clients" do
    process :options, "/assets/playbook.css"
    expect(response).to have_http_status(:no_content)
    expect(response.headers["Access-Control-Allow-Origin"]).to eq("*")
    expect(response.headers["Access-Control-Allow-Methods"]).to include("GET")
  end

  it "404s unknown paths" do
    get "/assets/not-a-real-file.js"
    expect(response).to have_http_status(:not_found)
  end

  it "rejects path traversal via dist/fonts prefixes" do
    [
      "/assets/fonts/../lib/playbook/version.rb",
      "/assets/chunks/../ai/index.json",
      "/assets/playbook.css/../../lib/playbook/version.rb",
      "/assets/vendor/../config/application.rb",
    ].each do |path|
      get path
      expect(response).to have_http_status(:not_found), "expected 404 for #{path}"
    end
  end

  it "rejects null bytes and absolute-looking paths" do
    get "/assets/playbook.css%00.js"
    expect(response).to have_http_status(:not_found)
  end
end
