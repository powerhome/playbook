$LOAD_PATH.push File.expand_path("lib", __dir__)

Gem::Specification.new do |s|
  s.name        = "nitro_theme"
  s.version     = "0.0.1"
  s.authors     = ["Nitro Developers"]
  s.email       = ["dev@powerhrg.com"]
  s.homepage    = "http://nitro.powerhrg.com"
  s.summary     = "Nitro's visual theme"
  s.description = "Nitro's visual theme, including page layout, styling and navigation"

  s.files = Dir["{app,config,db,lib}/**/*"] + ["Rakefile", "README.md"]

  s.add_dependency "bootstrap-sass", "3.3.5.1"
  s.add_dependency "coffee-rails", "4.2.2"
  s.add_dependency "jquery-rails", "4.3.1"
  s.add_dependency "lodash-rails", "3.10.1"
  s.add_dependency "naughty"
  s.add_dependency "nitro_auth"
  s.add_dependency "nitro_react"
  s.add_dependency "nitro_sg", "3.0.2"
  s.add_dependency "playbook_ui", "2.9.1"
  s.add_dependency "rails", "5.1.6.2"
  # should sassc version change, adjust umbrella Gemfile & Dockerfile accordingly
  s.add_dependency "sassc", "1.11.4"
  s.add_dependency "sassc-rails", "1.3.0"
  s.add_dependency "simple_form", "4.0.1"
  s.add_dependency "sprockets-rails", "2.3.3"
  s.add_dependency "turbolinks", "~> 5"
  s.add_dependency "will_paginate", "3.1.6"
  s.add_dependency "will_paginate-bootstrap", "1.0.1"

  s.add_development_dependency "nitro_linting"
  s.add_development_dependency "pry-byebug", "3.5.0"
  s.add_development_dependency "rainbow", "2.2.2"
  s.add_development_dependency "rspec-rails"
  s.add_development_dependency "simplecov", "0.15.1"
  s.add_development_dependency "test-unit", "3.1.5"
  s.add_development_dependency "timecop"
  s.add_development_dependency "yard", "0.9.20"
end
