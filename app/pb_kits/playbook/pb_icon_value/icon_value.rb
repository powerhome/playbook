# frozen_string_literal: true

module Playbook
  module PbIconValue
    class IconValue
      include Playbook::Props

      partial "pb_icon_value/icon_value"

      prop :value, type: Playbook::Props::
      prop :text
      prop :icon, required: true
      prop :align, type: Playbook::Props::Enum,
                  values: %w[left center right],
                  default: "left"

      def value
        if is_set? configured_text
          pb_icon_value = Playbook::PbBody::Body.new(color: "light") do
            icon + text
          end
          ApplicationController.renderer.render(partial: pb_icon_value, as: :object)
        end
      end

      def classname
        generate_classname("pb_icon_value_kit", align)
      end
    end
  end
end
