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

  s.files = Dir["{app,fonts,lib,stories}/**/*"] + ["Rakefile", "README.md"]

  s.add_dependency "actionpack", ">= 5.1.6", "< 6.0"
  s.add_dependency "actionview", ">= 5.1.6", "< 6.0"
  s.add_dependency "activesupport", ">= 5.1.6", "< 6.0"
  s.add_dependency "method_source", "0.9.2"
  s.add_dependency "redcarpet", "3.4.0"
  s.add_dependency "rouge", "1.10.1"
  s.add_dependency "sassc-rails", "1.3.0"
  s.add_dependency "slim-rails", "3.2.0"
  s.add_dependency "sprockets-rails", "2.3.3"
  s.add_dependency "webpacker", "4.0.7"
  s.add_dependency "webpacker-react", "~> 0.3.2"

  s.add_development_dependency "better_errors", "2.5.1"
  s.add_development_dependency "binding_of_caller", "0.8.0"
  s.add_development_dependency "byebug", "11.0.0"
  s.add_development_dependency "overcommit", "0.49.0"
  s.add_development_dependency "rainbow", "2.2.2"
  s.add_development_dependency "rubocop", "0.72.0"
  s.add_development_dependency "spring", "2.0.2"
  s.add_development_dependency "spring-watcher-listen", "2.0.1"
  s.add_development_dependency "tzinfo-data", "1.2018.9"
  s.add_development_dependency "uglifier", "4.1.20"
  s.add_development_dependency "web-console", "3.7.0"
end
