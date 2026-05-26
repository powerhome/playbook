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
end
