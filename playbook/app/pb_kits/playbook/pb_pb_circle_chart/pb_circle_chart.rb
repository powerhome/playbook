# frozen_string_literal: true

module Playbook
  module PbPbCircleChart
    class PbCircleChart < ::Playbook::KitBase
      prop :options, default: {}
      prop :container_props, default: {}

      def react_props
        {
          options: options,
          containerProps: container_props_hash,
        }
      end

      def container_props_hash
        container_props.merge({
                                id: id,
                                className: classname,
                              }).compact
      end

      def classname
        generate_classname("pb_pb_circle_chart")
      end
    end
  end
end
