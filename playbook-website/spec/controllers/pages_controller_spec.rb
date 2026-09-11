# frozen_string_literal: true

# spec/controllers/pages_controller_spec.rb
require "rails_helper"

RSpec.describe PagesController, type: :controller do
  describe "GET #application" do
    it "responds successfully" do
      get :application
      expect(response).to be_successful
    end

    it "disables HTTP caching for SPA shells and JSON loaders" do
      get :application
      expect(response.headers["Cache-Control"]).to include("no-store")
      expect(response.headers["Pragma"]).to eq("no-cache")
    end

    it "disables HTTP caching for production playground.json 404s" do
      @request.host = "playbook.powerapp.cloud"
      @request.env["PATH_INFO"] = "/playground"
      get :application, format: :json

      expect(response).to have_http_status(:not_found)
      expect(response.headers["Cache-Control"]).to include("no-store")
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
end
