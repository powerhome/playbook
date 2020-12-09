# frozen_string_literal: true

require "sassc-rails"
require "webpacker"
require "playbook/engine"

module Playbook
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))

  class ConflictingPropsError < StandardError; end
  class MissingPropError < StandardError; end

  class << self
    def webpacker
      @webpacker ||= ::Webpacker::Instance.new(
        root_path: ROOT_PATH,
        config_path: ROOT_PATH.join("config/webpacker.yml")
      )
    end
  end
end
