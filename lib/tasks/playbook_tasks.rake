# frozen_string_literal: true

require "webpacker"

namespace :playbook do
  namespace :webpacker do
    desc "Install deps with yarn"
    task :yarn_install do
      Dir.chdir(File.join(__dir__, "../..")) do
        system "yarn install --no-progress --production"
      end
    end

    desc "Compile JavaScript packs using webpack for production with digests"
    task compile: %i[yarn_install environment] do
      ::Webpacker.with_node_env("production") do
        if Playbook.webpacker.commands.compile
          # Successful compilation!
        else
          # Failed compilation
          exit!
        end
      end
    end
  end
end
