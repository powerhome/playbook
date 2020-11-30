Rails.application.routes.draw do
  root to: "guides#create_kit"
  get "guides", to: "guides#create_kit"
  get "guides/use-in-nitro", to: "guides#use_nitro"

  # Stub routes
  get "guides/use-in-nitro", as: :disable_dark_mode
  get "guides/use-in-nitro", as: :kits
  get "guides/use-in-nitro", as: :kit_show
  get "guides/use-in-nitro", as: :kit_category_show
end
