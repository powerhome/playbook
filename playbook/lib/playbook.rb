# frozen_string_literal: true

require "sassc-rails"
require "slim-rails"
require "webpacker"
require "webpacker/react"

require "playbook/props"
require "playbook/version"
require "playbook/engine" if defined?(Rails)

module Playbook
  class ConflictingPropsError < StandardError; end
  class MissingPropError < StandardError; end
end
