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
require "playbook/justify_content"
require "playbook/justify_self"
require "playbook/align_items"
require "playbook/align_content"
require "playbook/align_self"
require "playbook/flex"
require "playbook/flex_grow"
require "playbook/flex_shrink"
require "playbook/order"
require "playbook/position"
require "playbook/hover"
require "playbook/border_radius"
require "playbook/text_align"
require "playbook/overflow"
require "playbook/truncate"

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
    include Playbook::JustifyContent
    include Playbook::JustifySelf
    include Playbook::AlignItems
    include Playbook::AlignContent
    include Playbook::AlignSelf
    include Playbook::Flex
    include Playbook::FlexGrow
    include Playbook::FlexShrink
    include Playbook::Order
    include Playbook::Position
    include Playbook::Hover
    include Playbook::BorderRadius
    include Playbook::TextAlign
    include Playbook::Overflow
    include Playbook::Truncate

    prop :id
    prop :data, type: Playbook::Props::HashProp, default: {}
    prop :aria, type: Playbook::Props::HashProp, default: {}
    prop :children, type: Playbook::Props::Proc

    def object
      self
    end
  end
end
