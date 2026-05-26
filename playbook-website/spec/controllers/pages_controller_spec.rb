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

    it "returns guide content for getting started icons guide" do
      @request.env["PATH_INFO"] = "/guides/getting_started/icons"
      get :application, params: { page: "icons" }, format: :json

      json = JSON.parse(response.body)
      expect(json["guide_page_content"]).to be_present
      expect(json["guide_page_content"]).to include("Icon")
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
