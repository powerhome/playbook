# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "pages#application_beta"

  # Legacy /beta/* redirects (301)
  get "beta",       to: redirect("/")
  get "beta/*path", to: redirect("/%<path>s")

  # SPA routes — all served by the React app
  get "kits",                                to: "pages#application_beta"
  get "kits/advanced_table/:name/:platform", to: "pages#application_beta"
  get "kits/:name/:platform",                to: "pages#application_beta"
  get "kits/:name",                          to: "pages#application_beta"
  get "kit_category/:category",              to: "pages#application_beta"
  get "icons",                               to: "pages#application_beta"
  get "changelog/:variant",                  to: "pages#application_beta"
  get "changelog",                           to: "pages#application_beta"
  get "guides/getting_started/:page",        to: "pages#application_beta"
  get "guides/getting_started",              to: "pages#application_beta"
  get "guides/design_guidelines/:page",      to: "pages#application_beta"
  get "guides/design_guidelines",            to: "pages#application_beta"
  get "global_props/:name",                  to: "pages#application_beta"
  get "global_props",                        to: "pages#application_beta"
  get "tokens/:name",                        to: "pages#application_beta"
  get "tokens",                              to: "pages#application_beta"

  # Building Blocks (kept as legacy standalone)
  get "building_blocks",        to: "building_blocks#index"
  get "building_blocks/icons",  to: "building_blocks#icons"
  get "building_blocks/:name(/:type)", to: "building_blocks#show",
                                       as: "building_blocks_show",
                                       defaults: { type: "rails" }

  # Icons (standalone)
  get "playbook_icons", to: "playbook_icons#index"
end
