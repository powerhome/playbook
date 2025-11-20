# frozen_string_literal: true

$LOAD_PATH.push File.expand_path("../lib", __dir__)

require "playbook/version"

Gem::Specification.new do |s|
  s.name        = "playbook_ui_docs"
  s.version     = Playbook::VERSION
  s.authors     = ["Power UX", "Power Devs"]
  s.email       = ["nitroux@powerhrg.com", "dev@powerhrg.com"]
  s.homepage    = "https://playbook.powerapp.cloud/"
  s.summary     = "Playbook Design System Docs"
  s.description = "Display all the components from Playbook UI inside your own system."
  s.license     = "ISC"

  s.files = Dir[
    "app/pb_kits/playbook/pb_*/docs/**/*",
    "dist/app/components/playbook/pb_docs/**/*",
    "dist/menu.yml",
    "dist/pb_doc_helper.rb"
  ]

  s.add_dependency "playbook_ui"
end
