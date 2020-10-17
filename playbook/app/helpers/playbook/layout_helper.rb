# frozen_string_literal: true

module Playbook
  module LayoutHelper
    def layout(_name)
      Dir["../*"]
    end
  end
end
