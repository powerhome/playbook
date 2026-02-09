# frozen_string_literal: true

require "view_component"

require "playbook/version"
require "playbook/engine"
require "playbook/props"
require "playbook/forms"
require "playbook/pb_forms_helper"
require "playbook/pb_kit_helper"
require "playbook/pb_doc_helper" # Duplicated from website (Temp)
require "playbook/kit_base"
require "playbook/kit_resolver"
require "playbook/tokens"

module Playbook
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))

  class ConflictingPropsError < StandardError; end

  class MissingPropError < StandardError; end

module_function

  def kit_path(kit, *args)
    Playbook::Engine.root.join("app/pb_kits/playbook/pb_#{kit}", *args)
  end
end
