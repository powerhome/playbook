# frozen_string_literal: true

module Playbook
  class KitBase < ViewComponent::Base
    include Playbook::Props
    include Playbook::PbKitHelper

    def object
      self
    end
  end
end
