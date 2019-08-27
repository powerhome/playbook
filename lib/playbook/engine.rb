# frozen_string_literal: true

require "action_mailer/railtie"
require "sassc-rails"
require "slim-rails"

module Playbook
  class Engine < ::Rails::Engine
    isolate_namespace Playbook

    config.generators do |g|
      g.test_framework :rspec
    end

    config.assets.paths ||= []
    config.assets.paths << "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/fonts"

    config.sass.load_paths ||= []
    config.sass.load_paths << "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/app/pb_kits/playbook"

    initializer 'playbook_ui.add_view_paths', :after => :add_view_paths do |app|
      ActiveSupport.on_load(:action_controller) do
        append_view_path "#{Gem.loaded_specs['playbook_ui'].full_gem_path}/app/pb_kits/playbook"
      end
    end

    initializer "webpacker.proxy" do |app|
      insert_middleware = begin
                          Playbook.webpacker.config.dev_server.present?
                          rescue
                            nil
                        end
      next unless insert_middleware

      app.middleware.insert_before(
        0, Webpacker::DevServerProxy,
        ssl_verify_none: true,
        webpacker: Playbook.webpacker
      )
    end
  end
end
