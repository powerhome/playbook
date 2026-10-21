# frozen_string_literal: true

require "rails_helper"

# HostAuthorization blocks spoofed Host values before the app runs (same as local
# curl -H 'Host: ...'). Spoof bypasses are covered in playground_controller_spec.
# This request spec covers route mounting + the deploy-time flag end-to-end.
RSpec.describe "Rails playground preview gate", type: :request do
  around do |example|
    previous = Rails.application.config.x.rails_playground_enabled
    example.run
  ensure
    Rails.application.config.x.rails_playground_enabled = previous
    Rails.application.reload_routes!
  end

  before { host! "localhost" }

  def post_preview
    post "/kits/button/rails/playground/preview",
         params: { props: { "text" => "Hi" }, global_props: {} },
         as: :json
  end

  context "when PLAYBOOK_RAILS_PLAYGROUND_ENABLED is off" do
    before do
      Rails.application.config.x.rails_playground_enabled = false
      Rails.application.reload_routes!
    end

    it "does not mount the preview route" do
      expect do
        Rails.application.routes.recognize_path(
          "/kits/button/rails/playground/preview",
          method: :post
        )
      end.to raise_error(ActionController::RoutingError)
    end

    it "returns 404 for preview POSTs" do
      post_preview
      expect(response).to have_http_status(:not_found)
    end
  end

  context "when PLAYBOOK_RAILS_PLAYGROUND_ENABLED is on" do
    before do
      Rails.application.config.x.rails_playground_enabled = true
      Rails.application.reload_routes!
    end

    it "renders a Rails preview" do
      post_preview

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["error"]).to be_nil
      expect(json["html"]).to include("pb_button")
    end
  end
end
