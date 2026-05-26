# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "pages#application"

  # Legacy /beta/* redirects (301)
  get "beta",       to: redirect("/")
  get "beta/*path", to: redirect("/%<path>s")

  # SPA routes — all served by the React app
  get "kits",                                to: "pages#application"
  get "kits/advanced_table/:name/:platform", to: "pages#application"
  get "kits/:name/:platform",                to: "pages#application"
  get "kits/:name",                          to: "pages#application"
  get "kit_category/:category",              to: "pages#application"
  get "icons",                               to: "pages#application"
  get "changelog/:variant",                  to: "pages#application"
  get "changelog",                           to: "pages#application"
  get "guides/getting_started/:page",        to: "pages#application"
  get "guides/getting_started",              to: "pages#application"
  get "guides/design_guidelines/:page",      to: "pages#application"
  get "guides/design_guidelines",            to: "pages#application"
  get "global_props/:name",                  to: "pages#application"
  get "global_props",                        to: "pages#application"
  get "tokens/:name",                        to: "pages#application"
  get "tokens",                              to: "pages#application"

  # Building Blocks (kept as legacy standalone)
  get "building_blocks",        to: "building_blocks#index"
  get "building_blocks/icons",  to: "building_blocks#icons"
  get "building_blocks/:name(/:type)", to: "building_blocks#show",
                                       as: "building_blocks_show",
                                       defaults: { type: "rails" }
end
