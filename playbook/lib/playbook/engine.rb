# frozen_string_literal: true

require "sassc-rails"
require "webpacker/railtie"

module Playbook
  class Engine < ::Rails::Engine
    isolate_namespace Playbook

    config.generators do |g|
      g.test_framework :rspec
    end

    config.assets.paths ||= []
    config.assets.paths << "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/fonts"
    config.assets.paths << "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/app/pb_kits/playbook/pb_*"

    config.sass.load_paths ||= []
    config.sass.load_paths << "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/app/pb_kits/playbook"

    initializer "playbook_ui.add_view_paths", after: :add_view_paths do |_app|
      ActiveSupport.on_load(:action_controller) do
        append_view_path "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/app/pb_kits/playbook"
        append_view_path "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/app/pb_kits/playbook/config"
      end
    end
  end
end
