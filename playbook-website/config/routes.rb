# frozen_string_literal: true

Rails.application.routes.draw do
  root                            to: "pages#home"
  get "home",                     to: "pages#home"
  get "visual_guidelines",        to: redirect("/visual_guidelines/colors")
  get "visual_guidelines/:name",  to: "pages#visual_guidelines"
  get "changelog/web",            to: "pages#changelog_web"
  get "changelog/swift",          to: "pages#changelog_swift"
  get "changelog/figma",          to: "pages#changelog_figma"
  get "drawer_page", to: "pages#drawer_page"
  get "changelog", to: redirect("changelog/web")

  get "changelog/*path", to: redirect("changelog/web")

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
  get "kit_category/:category",         to: "pages#kit_category_show_rails",  as: "kit_category_show"
  get "kit_category/:category/rails",   to: "pages#kit_category_show_rails",  as: "kit_category_show_rails"
  get "kit_category/:category/react",   to: "pages#kit_category_show_react",  as: "kit_category_show_reacts"
  get "kit_category/:category/swift",   to: "pages#kit_category_show_swift",  as: "kit_category_show_swift"
  get "kit_collection/*names/:name(/*variants)/rails",    to: "pages#kit_collection_show_rails", as: "kit_collection_show_rails"
  get "kit_collection/*names/:name(/*variants)/react",    to: "pages#kit_collection_show_react", as: "kit_collection_show_react"
  get "kit_collection/*names/:name(/*variants)/swift",    to: "pages#kit_collection_show_swift", as: "kit_collection_show_swift"
  get "kit_collection/*names/(/:name)(/*variants)(/:type)", to: "pages#kit_collection_show_rails", defaults: { type: "rails" }, as: "kit_collection_show"
  get "kit_variants_collection/*names/:name(/*kit_variants)/rails",    to: "pages#kit_variants_collection_show_rails", as: "kit_variants_collection_show_rails"
  get "kit_variants_collection/*names/:name(/*kit_variants)/react",    to: "pages#kit_variants_collection_show_react", as: "kit_variants_collection_show_react"
  get "kit_variants_collection/*names/(/:name)(/*kit_variants)(/:type)", to: "pages#kit_variants_collection_show_rails", defaults: { type: "rails" }, as: "kit_variants_collection_show"

  # Experiments
  #
  get "kits/:name/rails_in_react",  to: "pages#rails_in_react",       as: "rails_in_react"
  get "kits/:name/rails_raw",       to: "pages#rails_raw",            as: "rails_raw"
  get "kit_playground_rails",       to: "pages#kit_playground_rails", as: "kit_playground_rails"
  post "rails_pg_render",           to: "pages#rails_pg_render",      as: "rails_pg_render"

  # Icon Docs
  get "guides/getting_started/icons/font_awesome", to: "pages#icons_font_awesome"
  get "guides/getting_started/icons/playbook",     to: "pages#icons_playbook"
  get "guides/getting_started/icons/custom",       to: "pages#icons_custom"
  get "guides/getting_started/icons",              to: "pages#icons"

  # Docs
  get "guides/:parent",         to: "guides#md_doc", as: "guides_parent"
  get "guides/:parent/:page",   to: "guides#md_doc", as: "guides_parent_page"

  # Patterns
  get "patterns", to: "patterns#index"
  get "patterns/icons", to: "patterns#icons"
  get "patterns/:name(/:type)", defaults: { type: "rails" },
                                to: "patterns#show",
                                as: "patterns_show"

  # Icons
  get "playbook_icons", to: "playbook_icons#index"

  # dark mode
  get "/enable_dark_mode", to: "pages#enable_dark_mode", as: "enable_dark_mode"
  get "/disable_dark_mode", to: "pages#disable_dark_mode", as: "disable_dark_mode"
end
