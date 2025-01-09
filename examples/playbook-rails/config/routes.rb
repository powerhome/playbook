# frozen_string_literal: true

Rails.application.routes.draw do
  root "pages#index"

  get "/pages", to: "pages#index"
  post "/feedback", to: "feedback#create"
end
