# frozen_string_literal: true

require "rails_helper"

RSpec.describe PlaygroundController, type: :controller do
  describe "POST #preview gate" do
    around do |example|
      previous = Rails.application.config.x.rails_playground_enabled
      example.run
    ensure
      Rails.application.config.x.rails_playground_enabled = previous
    end

    def post_preview
      post :preview, params: { name: "button", props: { "text" => "Hi" }, global_props: {} }, as: :json
    end

    context "when PLAYBOOK_RAILS_PLAYGROUND_ENABLED is off" do
      before { Rails.application.config.x.rails_playground_enabled = false }

      it "returns 404 even if Host / X-Forwarded-Host are spoofed" do
        @request.host = "PLAYBOOK.POWERAPP.CLOUD"
        @request.headers["X-Forwarded-Host"] = "anything.example"
        post_preview
        expect(response).to have_http_status(:not_found)
        expect(response.body).to be_blank
      end
    end

    context "when PLAYBOOK_RAILS_PLAYGROUND_ENABLED is on" do
      before { Rails.application.config.x.rails_playground_enabled = true }

      it "renders a Rails preview" do
        post_preview
        expect(response).to have_http_status(:ok)

        json = JSON.parse(response.body)
        expect(json["error"]).to be_nil
        expect(json["html"]).to include("pb_button")
      end
    end
  end
end
