# frozen_string_literal: true

require "playbook/classnames"
require "playbook/spacing"
require "playbook/z_index"
require "playbook/number_spacing"

module Playbook
  class KitBase < ViewComponent::Base
    include Playbook::PbKitHelper
    include Playbook::Props
    include Playbook::Classnames
    include Playbook::Spacing
    include Playbook::ZIndex
    include Playbook::NumberSpacing

    prop :id
    prop :data, type: Playbook::Props::Hash, default: {}
    prop :aria, type: Playbook::Props::Hash, default: {}
    prop :children, type: Playbook::Props::Proc

    def object
      self
    end
  end
end
