Rails.application.routes.draw do
  # Pages
  root to: "pages#home"
  get "home", to: "pages#home"
  get "getting_started", to: "pages#getting_started"
  get "kits", to: "pages#kits"
  get "visual_guidelines", to: "pages#visual_guidelines"

  get "kits/:name", to: "pages#kit_show_rails", as: :kit_show
  get "kits/:name/rails", to: "pages#kit_show_rails", as: :kit_show_rails
  get "kits/:name/react", to: "pages#kit_show_react", as: :kit_show_reacts

  get "kit_category/:name", to: "pages#kit_category_show_rails", as: :kit_category_show
  get "kit_category/:name/rails", to: "pages#kit_category_show_rails", as: :kit_category_show_rails
  get "kit_category/:name/react", to: "pages#kit_category_show_react", as: :kit_category_show_reacts

  # Dark mode
  get "/enable_dark_mode", to: "pages#enable_dark_mode", as: :enable_dark_mode
  get "/disable_dark_mode", to: "pages#disable_dark_mode", as: :disable_dark_mode

  # Guides
  get "guides", to: "guides#create_kit"
  get "guides/use-in-nitro", to: "guides#use_nitro"

  # Samples
  get "samples/:name", to: "samples#sample_show_rails", as: :sample_show
  get "samples/:name/rails", to: "samples#sample_show_rails", as: :sample_show_rails
  get "samples/:name/react", to: "samples#sample_show_react", as: :sample_show_reacts
  get "samples/", to: "samples#samples_index"
end
