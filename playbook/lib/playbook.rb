# frozen_string_literal: true

require "sassc-rails"
require "slim-rails"
require "webpacker"
require "webpacker/react"
require "view_component/engine"

require "playbook/props"
require "playbook/version"
require "playbook/pb_kit_helper"
require "playbook/pb_doc_helper"
require "playbook/kit_base"
require "playbook/kit_resolver"
require "playbook/markdown"
require "playbook/engine" if defined?(Rails)

module Playbook
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))

  class ConflictingPropsError < StandardError; end
  class MissingPropError < StandardError; end

module_function

  def webpacker
    @webpacker ||= ::Webpacker::Instance.new(
      root_path: ROOT_PATH,
      config_path: ROOT_PATH.join("config/webpacker.yml")
    )
  end

  def kit_path(kit, *args)
    Playbook::Engine.root.join("app/pb_kits/playbook/pb_#{kit}", *args)
  end
end
