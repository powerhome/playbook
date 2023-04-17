# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitApi < Playbook::KitBase
      prop :kit, type: Playbook::Props::String, required: true

      def kit_local_props
        # global = []

        local = []
        # puts kit_props.class
        kit_props.each do |key, value|
          value.kit == Playbook::PbButton::Button && local.push(key)
        end
        local
      end

      def kit_props
        kit_class.props
      end

    private

      def kit_class
        @kit_class ||= Playbook::KitResolver.resolve(kit.to_s)
      end
    end
  end
end
