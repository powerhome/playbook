require 'action_mailer/railtie'
require 'sass-rails'
require 'slim-rails'

module Playbook
  class Engine < ::Rails::Engine
    isolate_namespace Playbook

    config.generators do |g|
      g.test_framework :rspec
    end

    config.sass.load_paths ||= []
    config.assets.paths ||= []
    config.assets.paths << "#{Gem.loaded_specs['playbook'].full_gem_path}/fonts"
    config.sass.load_paths << "#{Gem.loaded_specs['playbook'].full_gem_path}/sass-mixins"
    config.sass.load_paths << "#{Gem.loaded_specs['playbook'].full_gem_path}/components"

    initializer "webpacker.proxy" do |app|
        insert_middleware = begin
                            MyEngine.webpacker.config.dev_server.present?
                          rescue
                            nil
                          end
        next unless insert_middleware

        app.middleware.insert_before(
          0, Webpacker::DevServerProxy,
          ssl_verify_none: true,
          webpacker: MyEngine.webpacker
        )
      end
  end
end
