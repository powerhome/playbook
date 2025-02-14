# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper Playbook::PbKitHelper
  helper_method :current_user

  def index; end

  def current_user
    @current_user ||= begin
      if session[:current_user].present?
        OpenStruct.new(JSON.parse(session[:current_user], symbolize_names: true))
      else
        user = fetch_current_user
        session[:current_user] = user.to_h.to_json
        OpenStruct.new(user)
      end
    end
  end

  private

  def fetch_current_user
    response = HTTParty.get('https://randomuser.me/api/')
    user_data = response.parsed_response["results"].first

    {
      first_name: user_data["name"]["first"],
      last_name: user_data["name"]["last"],
      email: user_data["email"],
      avatar: user_data["picture"]["large"],
      inbox: rand(99),
      notifications: rand(99)
    }
  end
end
