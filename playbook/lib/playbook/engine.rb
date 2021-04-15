# frozen_string_literal: true

require "view_component/engine"
require "action_view/railtie"
require "view_component/engine"
require "webpacker/react"
require "sassc-rails"

module Playbook
  class Engine < ::Rails::Engine
    isolate_namespace Playbook

    config.generators do |g|
      g.test_framework :rspec
    end

    config.view_component.render_monkey_patch_enabled = false

    config.assets.paths ||= []
    config.assets.paths << Playbook::Engine.root.join("fonts")
    config.assets.paths << Playbook::Engine.root.join("app/pb_kits/playbook/pb_*")

    config.sass.load_paths ||= []
    config.sass.load_paths << Playbook::Engine.root.join("app/pb_kits/playbook")
  end
end
