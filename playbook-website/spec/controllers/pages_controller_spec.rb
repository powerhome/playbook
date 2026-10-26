# frozen_string_literal: true

# spec/controllers/pages_controller_spec.rb
require "rails_helper"

RSpec.describe PagesController, type: :controller do
  describe "GET #application" do
    it "responds successfully" do
      get :application
      expect(response).to be_successful
    end

    it "assigns variables" do
      get :application
      expect(assigns(:kits)).to be_present
      expect(assigns(:dark)).to be_in([true, false])
      expect(assigns(:type)).to eq("react")
      expect(assigns(:examples)).to be_an(Array)
    end

    it "renders the correct template" do
      get :application
      expect(response).to render_template("application")
    end

    it "returns guide content for getting started dependencies guide" do
      @request.env["PATH_INFO"] = "/guides/getting_started/dependencies"
      get :application, params: { page: "dependencies" }, format: :json

      json = JSON.parse(response.body)
      expect(json["guide_page_content"]).to be_present
      expect(json["guide_page_content"]).to include("Dependencies")
      expect(json["icons_by_category"]).to be_nil
    end

    it "returns icon catalog data for /icons.json" do
      @request.env["PATH_INFO"] = "/icons"
      get :application, format: :json

      json = JSON.parse(response.body)
      expect(json["icons_by_category"]).to be_present
      expect(json["guide_page_content"]).to be_nil
    end

    it "returns icon catalog data for /icons/ with trailing slash" do
      @request.env["PATH_INFO"] = "/icons/"
      get :application, format: :json

      json = JSON.parse(response.body)
      expect(json["icons_by_category"]).to be_present
    end
  end

  describe "GET /playground.json gate" do
    around do |example|
      previous = Rails.application.config.x.rails_playground_enabled
      example.run
    ensure
      Rails.application.config.x.rails_playground_enabled = previous
    end

    def request_playground_json
      @request.env["PATH_INFO"] = "/playground"
      get :application, format: :json
    end

    context "when PLAYBOOK_RAILS_PLAYGROUND_ENABLED is off" do
      before { Rails.application.config.x.rails_playground_enabled = false }

      it "returns 404 for playground JSON even if Host / X-Forwarded-Host are spoofed" do
        @request.host = "PLAYBOOK.POWERAPP.CLOUD"
        @request.headers["X-Forwarded-Host"] = "anything.example"
        request_playground_json
        expect(response).to have_http_status(:not_found)
        expect(response.body).to be_blank
      end

      it "still serves the HTML /playground shell" do
        @request.env["PATH_INFO"] = "/playground"
        get :application
        expect(response).to be_successful
        expect(response).to render_template("application")
      end

      it "omits playground_config from kit JSON" do
        @request.env["PATH_INFO"] = "/kits/button/react"
        get :application, params: { name: "button", platform: "react" }, format: :json

        json = JSON.parse(response.body)
        expect(json["playground_config"]).to be_nil
      end
    end

    context "when PLAYBOOK_RAILS_PLAYGROUND_ENABLED is on" do
      before { Rails.application.config.x.rails_playground_enabled = true }

      it "returns playground builder payloads" do
        request_playground_json
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json["playground_kits"]).to be_an(Array)
        expect(json["playground_kits"]).not_to be_empty
      end
    end
  end
end
