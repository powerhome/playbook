# frozen_string_literal: true

Rails.application.routes.draw do
  root                            to: "pages#home"
  get "home",                     to: "pages#home"
  get "visual_guidelines",        to: redirect("/visual_guidelines/colors")
  get "visual_guidelines/:name",  to: "pages#visual_guidelines"
  get "changelog",                to: "pages#changelog"

  # Kits
  get "kits", to: "pages#kits"
  get "kits/:name",                 to: "pages#kit_show_rails",           as: "kit_show"
  get "kits/:name/rails",           to: "pages#kit_show_rails",           as: "kit_show_rails"
  get "kits/:name/react",           to: "pages#kit_show_react",           as: "kit_show_reacts"
  get "kits/:name/swift",           to: "pages#kit_show_swift",           as: "kit_show_swift"
  get "kit_category/:name",         to: "pages#kit_category_show_rails",  as: "kit_category_show"
  get "kit_category/:name/rails",   to: "pages#kit_category_show_rails",  as: "kit_category_show_rails"
  get "kit_category/:name/react",   to: "pages#kit_category_show_react",  as: "kit_category_show_reacts"

  # Experiments
  get "kits/:name/sandpack",        to: "pages#kit_show_new",         as: "kit_show_new"
  get "kits/:name/rails_in_react",  to: "pages#rails_in_react",       as: "rails_in_react"
  get "kits/:name/rails_raw",       to: "pages#rails_raw",            as: "rails_raw"
  get "kit_playground_rails",       to: "pages#kit_playground_rails", as: "kit_playground_rails"
  post "rails_pg_render",           to: "pages#rails_pg_render",      as: "rails_pg_render"

  # Docs
  get "guides/:parent",         to: "guides#md_doc", as: "guides_parent"
  get "guides/:parent/:page",   to: "guides#md_doc", as: "guides_parent_page"

  # Samples
  get "samples", to: "samples#index"
  get "samples/:name(/:type)", defaults: { type: "rails" },
                               to: "samples#show",
                               as: "sample_show"

  # dark mode
  get "/enable_dark_mode", to: "pages#enable_dark_mode", as: "enable_dark_mode"
  get "/disable_dark_mode", to: "pages#disable_dark_mode", as: "disable_dark_mode"
end
