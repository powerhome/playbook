# frozen_string_literal: true

Rails.application.routes.draw do
  root                            to: "pages#home"
  get "home",                     to: "pages#home"
  get "visual_guidelines",        to: redirect("/visual_guidelines/colors")
  get "visual_guidelines/:name",  to: "pages#visual_guidelines"
  get "changelog",                to: "pages#changelog"

  # Kits

  ## Beta View
  get "beta/kits", to: "pages#application_beta"
  get "beta/kits/:name", to: "pages#application_beta"
  get "beta/icons", to: "pages#application_beta"

  # Legacy View
  get "kits", to: "pages#kits"
  get "kits/:name",                 to: "pages#kit_show_rails",           as: "kit_show"
  get "kits/:name/rails",           to: "pages#kit_show_rails",           as: "kit_show_rails"
  get "kits/:name/react",           to: "pages#kit_show_react",           as: "kit_show_reacts"
  get "kits/:name/swift",           to: "pages#kit_show_swift",           as: "kit_show_swift"
  get "kit_category/:name",         to: "pages#kit_category_show_rails",  as: "kit_category_show"
  get "kit_category/:name/rails",   to: "pages#kit_category_show_rails",  as: "kit_category_show_rails"
  get "kit_category/:name/react",   to: "pages#kit_category_show_react",  as: "kit_category_show_reacts"
  get "kit_category/:name/swift",   to: "pages#kit_category_show_swift",  as: "kit_category_show_swift"
  get "kit_collection/*names/:name/rails",    to: "pages#kit_collection_show_rails",                        as: "kit_collection_show_rails"
  get "kit_collection/*names/:name/react",    to: "pages#kit_collection_show_react",                        as: "kit_collection_show_react"
  get "kit_collection/*names/:name/swift",    to: "pages#kit_collection_show_swift",                        as: "kit_collection_show_swift"
  get "kit_collection/*names/(/:name)(/:type)", to: "pages#kit_collection_show_rails", defaults: { type: "rails" }, as: "kit_collection_show"

  # Experiments
  #
  get "kits/:name/sandpack",        to: "pages#kit_show_new",         as: "kit_show_new"
  get "kits/:name/rails_in_react",  to: "pages#rails_in_react",       as: "rails_in_react"
  get "kits/:name/rails_raw",       to: "pages#rails_raw",            as: "rails_raw"

  # Docs
  get "guides/:parent",         to: "guides#md_doc", as: "guides_parent"
  get "guides/:parent/:page",   to: "guides#md_doc", as: "guides_parent_page"

  # Samples
  get "samples", to: "samples#index"
  get "samples/icons", to: "samples#icons"
  get "samples/:name(/:type)", defaults: { type: "rails" },
                               to: "samples#show",
                               as: "sample_show"

  # dark mode
  get "/enable_dark_mode", to: "pages#enable_dark_mode", as: "enable_dark_mode"
  get "/disable_dark_mode", to: "pages#disable_dark_mode", as: "disable_dark_mode"

  # Advanced Table
  get "full_list", to: "pages#full_list", as: "full_list"
  get "/advanced_table_table", to: "advanced_table#table", as: :kpi_table
  get "/net_sales_kpi_list", to: "advanced_table#list", as: :kpi_list
  get "/advanced_table_quarter", to: "advanced_table#quarter", as: :kpi_quarter
  get "/advanced_table_months", to: "advanced_table#month", as: :kpi_monthly
  get "/advanced_table_daily", to: "advanced_table#day", as: :kpi_daily
  get "/advanced_table_cumulated", to: "advanced_table_cumulated#index"
end
