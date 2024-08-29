# frozen_string_literal: true

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
      get :kit_show_rails, params: { name: "valid_kit" }
      expect(response).to be_successful
    end

    it "redirects for invalid kit" do
      allow(controller).to receive(:missing_rails_kit?).and_return(true)
      allow(controller).to receive(:missing_react_kit?).and_return(false)
      get :kit_show_rails, params: { name: "invalid_kit" }
      expect(response).to redirect_to(action: "kit_show_react")
    end
  end

  describe "GET #visual_guidelines" do
    it "responds successfully" do
      get :visual_guidelines
      expect(response).to be_successful
    end

    it "assigns kit examples" do
      get :visual_guidelines
      expect(assigns(:kit_examples_json)).to be_a(Hash)
    end
  end

  describe "POST #enable_dark_mode" do
    it "sets dark mode cookie" do
      post :enable_dark_mode
      expect(cookies[:dark_mode]).to eq("true")
    end

    it "redirects back" do
      request.env["HTTP_REFERER"] = "http://example.com"
      post :enable_dark_mode
      expect(response).to redirect_to("http://example.com")
    end
  end

  describe "POST #disable_dark_mode" do
    it "sets dark mode cookie to false" do
      post :disable_dark_mode
      expect(cookies[:dark_mode]).to eq("false")
    end

    it "redirects back" do
      request.env["HTTP_REFERER"] = "http://example.com"
      post :disable_dark_mode
      expect(response).to redirect_to("http://example.com")
    end
  end
end
