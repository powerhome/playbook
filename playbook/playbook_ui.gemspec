# frozen_string_literal: true

$LOAD_PATH.push File.expand_path("lib", __dir__)

require "playbook/version"

Gem::Specification.new do |s|
  s.name        = "playbook_ui"
  s.version     = Playbook::VERSION
  s.authors     = ["Power UX", "Power Devs"]
  s.email       = ["nitroux@powerhrg.com", "dev@powerhrg.com"]
  s.homepage    = "https://playbook.powerapp.cloud/"
  s.summary     = "Playbook Design System"
  s.description = "Playbook UI is built out in Ruby View Components and React Components. Playbook takes a modern design approach and applies it in a way that makes it easy to support bleeding edge or legacy systems."
  s.license     = "ISC"

  s.files = Dir[
    "app/pb_kits/playbook/pb_*/**/*",
    "app/pb_kits/playbook/_*.scss",
    "app/pb_kits/playbook/{plugins,tokens,utilities}/**/*",
    "app/assets/images/*",
    "fonts/**/*",
    "lib/*.rb",
    "lib/playbook/**/*",
    "dist/chunks/*",
    "dist/playbook.css",
    "dist/reset.css",
    "dist/playbook-doc.js",
    "dist/playbook-rails.js",
    "dist/playbook-rails-react-bindings.js",
    "dist/menu.yml",
  ] + ["Rakefile"]

  s.files.reject! { |file| file == "dist/chunks/lib.js" }

  s.add_dependency "actionpack", ">= 5.2.4.5"
  s.add_dependency "actionview", ">= 5.2.4.5"
  s.add_dependency "activesupport", ">= 5.2.4.5"
  s.add_dependency "vite_rails"
  s.add_dependency "view_component", "2.83.0"

  s.add_development_dependency "brakeman", "7.0.0"
  s.add_development_dependency "byebug", ">= 11.0.0"
  s.add_development_dependency "github_changelog_generator", "1.15.2"
  s.add_development_dependency "rails", ">= 5.2.4.5"
  s.add_development_dependency "rspec-html-matchers", "0.9.1"
  s.add_development_dependency "rspec-rails", "~> 3.8", ">= 3.8.0"
  s.add_development_dependency "rubocop"
  s.add_development_dependency "rubocop-performance", "~> 1.11.5"
  s.add_development_dependency "tzinfo-data", "1.2018.9"
  s.add_development_dependency "will_paginate", "3.3.1"
end
