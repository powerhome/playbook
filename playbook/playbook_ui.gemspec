# frozen_string_literal: true

$LOAD_PATH.push File.expand_path("lib", __dir__)

require "playbook/version"

Gem::Specification.new do |s|
  s.name        = "playbook_ui"
  s.version     = Playbook::VERSION
  s.authors     = ["Power UX", "Power Devs"]
  s.email       = ["nitroux@powerhrg.com", "dev@powerhrg.com"]
  s.homepage    = "http://playbook.powerapp.cloud"
  s.summary     = "Playbook Design System"
  s.description = "Playbook Design System. Built for Nitro, but powering all."
  s.license     = "MIT"

  s.files = Dir[
    "app/pb_kits/playbook/pb_*/**/*",
    "app/pb_kits/playbook/{plugins,tokens,utilities}/**/*",
    "app/pb_kits/playbook/data/menu.yml",
    "app/pb_kits/playbook/*.{scss,js,rb}",
    "app/assets/images/*",
    "fonts/**/*",
    "lib/*.rb",
    "lib/playbook/**/*",
    "dist/reset.css"
  ] + ["Rakefile", "README.md"]

  s.add_dependency "actionpack", ">= 5.2.4.5", "< 6.0"
  s.add_dependency "actionview", ">= 5.2.4.5", "< 6.0"
  s.add_dependency "activesupport", ">= 5.2.4.5", "< 6.0"
  s.add_dependency "react-rails", "~> 2.6"
  s.add_dependency "redcarpet", "~> 3.5"
  s.add_dependency "rouge", "~> 3.15"
  s.add_dependency "view_component", "~> 2.23"
  s.add_dependency "webpacker-react", "~> 0.3.2"

  s.add_development_dependency "byebug", "11.0.0"
  s.add_development_dependency "github_changelog_generator", "1.15.2"
  s.add_development_dependency "overcommit", "0.49.0"
  s.add_development_dependency "rails", ">= 5.2.4.5", "< 6.0"
  s.add_development_dependency "rspec-html-matchers", "0.9.1"
  s.add_development_dependency "rspec-rails", "~> 3.8", ">= 3.8.0"
  s.add_development_dependency "rubocop", "0.81.0"
  s.add_development_dependency "spring", "2.0.2"
  s.add_development_dependency "spring-watcher-listen", "2.0.1"
  s.add_development_dependency "tzinfo-data", "1.2018.9"
end
