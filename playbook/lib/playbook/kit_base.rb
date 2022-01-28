# frozen_string_literal: true

require "playbook/classnames"
require "playbook/spacing"
require "playbook/z_index"
require "playbook/number_spacing"
require "playbook/shadow"
require "playbook/line_height"
require "playbook/display"
require "playbook/cursor"
require "playbook/flex_direction"
require "playbook/flex_wrap"

module Playbook
  class KitBase < ViewComponent::Base
    include Playbook::PbKitHelper
    include Playbook::Props
    include Playbook::Classnames
    include Playbook::Spacing
    include Playbook::ZIndex
    include Playbook::NumberSpacing
    include Playbook::Shadow
    include Playbook::LineHeight
    include Playbook::Display
    include Playbook::Cursor
    include Playbook::FlexDirection
    include Playbook::FlexWrap

    prop :id
    prop :data, type: Playbook::Props::Hash, default: {}
    prop :aria, type: Playbook::Props::Hash, default: {}
    prop :children, type: Playbook::Props::Proc

    def object
      self
    end
  end
end
