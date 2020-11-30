Rails.application.routes.draw do
  root to: "guides#create_kit"
  get "guides", to: "guides#create_kit"
  get "guides/use-in-nitro", to: "guides#use_nitro"
end
