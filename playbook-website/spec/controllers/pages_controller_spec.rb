# frozen_string_literal: true

# spec/controllers/pages_controller_spec.rb
require "rails_helper"

RSpec.describe PagesController, type: :controller do
  # Test the index action
  describe "GET #index" do
    it "one is equal to one " do
      expect(1).to eq(1)
    end

    it "returns a successful response" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  # You can add more tests for other actions here
end
