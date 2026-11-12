# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Rails kit documentation", type: :request do
  before { host! "localhost" }

  it "serves the website shell with a Vite entrypoint on a direct kit URL" do
    get "/kits/button/rails"

    expect(response).to have_http_status(:ok)
    expect(response.media_type).to eq("text/html")
    document = Nokogiri::HTML(response.body)
    expect(document.at_css(".pb--website-react-host")).to be_present
    expect(document.at_css('script[type="module"][src*="application"]')).to be_present
  end

  it "returns rendered Rails examples in the kit JSON response" do
    get "/kits/button/rails.json"

    expect(response).to have_http_status(:ok)
    expect(response.media_type).to eq("application/json")
    payload = response.parsed_body
    expect(payload).to include("kit" => "button", "type" => "rails")
    expect(payload.fetch("examples").pluck("rendered")).to include(a_string_including("pb_button"))
  end

  {
    "/kits/button/swift" => "/kits/button/rails",
    "/kits/advanced_table/default/swift" => "/kits/advanced_table/default/rails",
    "/beta/kits/button/rails" => "/kits/button/rails",
  }.each do |legacy_path, destination|
    it "redirects #{legacy_path} to #{destination}" do
      get legacy_path

      expect(response).to have_http_status(:moved_permanently)
      expect(response).to redirect_to(destination)
    end
  end
end
