# frozen_string_literal: true

# spec/controllers/pages_controller_spec.rb
require "rails_helper"

RSpec.describe PagesController, type: :controller do
  describe "GET #application_beta" do
    it "responds successfully" do
      get :application_beta
      expect(response).to be_successful
    end

    it "assigns variables" do
      get :application_beta
      expect(assigns(:kits)).to be_present
      expect(assigns(:dark)).to be_in([true, false])
      expect(assigns(:type)).to eq("react")
      expect(assigns(:examples)).to be_an(Array)
    end

    it "renders the correct template" do
      get :application_beta
      expect(response).to render_template("application_beta")
    end
  end

  describe "GET #home" do
    it "responds successfully" do
      get :home
      expect(response).to be_successful
    end

    it "assigns structured data" do
      get :home
      expect(assigns(:structured_data)).to be_present
    end
  end

  describe "GET #changelog_web" do
    it "responds successfully" do
      get :changelog_web
      expect(response).to be_successful
    end

    it "renders the correct layout" do
      get :changelog_web
      expect(response).to render_template("layouts/changelog")
    end
  end

  describe "GET #kits" do
    it "responds successfully" do
      get :kits
      expect(response).to be_successful
    end

    it "assigns variables" do
      get :kits
      expect(assigns(:type)).to eq("react")
      expect(assigns(:users)).to be_present
      expect(assigns(:table_data)).to be_present
    end
  end

  describe "GET #kit_show_rails" do
    it "responds successfully for valid kit" do
      allow(controller).to receive(:missing_rails_kit?).and_return(false)
      get :kit_show_rails, params: { name: "dialog" }
      expect(response).to be_successful
    end

    it "redirects for invalid kit" do
      allow(controller).to receive(:missing_rails_kit?).and_return(true)
      allow(controller).to receive(:missing_react_kit?).and_return(false)
      get :kit_show_rails, params: { name: "invalid_kit" }
      expect(response).to redirect_to(action: "home")
    end
  end

  describe "POST #enable_dark_mode" do
    it "sets dark mode cookie" do
      post :enable_dark_mode
      expect(cookies[:dark_mode]).to eq("true")
    end

    it "redirects back" do
      request.env["HTTP_REFERER"] = "http://test.host/"
      post :enable_dark_mode
      expect(response).to redirect_to("http://test.host/")
    end
  end

  describe "POST #disable_dark_mode" do
    it "sets dark mode cookie to false" do
      post :disable_dark_mode
      expect(cookies[:dark_mode]).to eq("false")
    end

    it "redirects back" do
      request.env["HTTP_REFERER"] = "http://test.host/"
      post :disable_dark_mode
      expect(response).to redirect_to("http://test.host/")
    end
  end

  describe "GET #kit_collection_show" do
    it "should redirect to home on missing template" do
      get :kit_collection_show_rails, params: { names: "image&caption&section_separator", name: "image", variants: "1952df896c6a79bb730cdfb69adf4fa0", formats: "png" }
      expect(response).to be_successful
    end
  end
end
