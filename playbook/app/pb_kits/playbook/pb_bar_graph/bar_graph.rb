# frozen_string_literal: true

module Playbook
  module PbBarGraph
    class BarGraph < Playbook::KitBase
      prop :options, default: {}
      prop :container_props, default: {}

      def chart_options
        options
      end

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
        generate_classname("pb_bar_graph")
      end
    end
  end
end
