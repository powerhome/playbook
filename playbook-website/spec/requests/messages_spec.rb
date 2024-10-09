# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Messages", type: :request do
  describe "GET /messages" do
    it "works! (now write some real specs)" do
      get messages_path
      expect(response).to have_http_status(200)
    end
  end
end
