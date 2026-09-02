# frozen_string_literal: true

Rails.application.routes.draw do
  # Staging host: Playground (+ kit Playground tabs) is served here; all other pages redirect to prod.
  # `as: nil` avoids clashing with the named routes defined below for prod/local.
  constraints(host: "staging.playbook.powerapp.cloud") do
    get "playground", to: "pages#application", as: nil

    # Kit show pages stay on staging when ?tab=playground (client redirects Docs/Props to prod).
    get "kits",                                to: "pages#application", as: nil
    get "kits/advanced_table/:name/:platform", to: "pages#application", as: nil
    get "kits/:name/:platform",                to: "pages#application", as: nil
    get "kits/:name",                          to: "pages#application", as: nil

    root to: redirect("https://playbook.powerapp.cloud/"), as: nil

    get "(*path)", to: redirect { |_params, request|
      qs = request.query_string.present? ? "?#{request.query_string}" : ""
      "https://playbook.powerapp.cloud#{request.path}#{qs}"
    }, as: nil
  end

  # Everywhere else (prod / local): Playground always redirects to staging.
  get "playground", to: redirect { |_params, request|
    qs = request.query_string.present? ? "?#{request.query_string}" : ""
    "https://staging.playbook.powerapp.cloud/playground#{qs}"
  }

  root to: "pages#application"

  # Legacy /beta/* redirects (301)
  get "beta",       to: redirect("/")
  get "beta/*path", to: redirect("/%<path>s")

  # Legacy Swift kit platform → Rails
  get "kits/advanced_table/:name/swift",     to: redirect("/kits/advanced_table/%<name>s/rails")
  get "kits/:name/swift",                    to: redirect("/kits/%<name>s/rails")

  # SPA routes: all served by the React app
  get "kits",                                to: "pages#application"
  get "kits/advanced_table/:name/:platform", to: "pages#application"
  get "kits/:name/:platform",                to: "pages#application"
  get "kits/:name",                          to: "pages#application"
  get "kit_category/:category",              to: "pages#application"
  get "worldcup",                            to: "pages#application"
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
end
