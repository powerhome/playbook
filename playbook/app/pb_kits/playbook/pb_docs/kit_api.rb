# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitApi < Playbook::KitBase
      prop :kit, type: Playbook::Props::String, required: true

      def kit_local_props
        local = []
        kit_props.each do |key, value|
          value.kit != Playbook::KitBase && local.push({ key: key, value: value })
        end
        local
      end

      def local_prop_data
        local_props = {}

        kit_local_props.each do |key, _value|
          name = key[:value].instance_variable_get(:@name)
          type = key[:value].class.to_s.split("::").last
          default = key[:value].instance_variable_get(:@default)
          values = key[:value].instance_variable_get(:@values)
          local_props[name.to_sym] = { "type": type, "default": default, "values": values }
        end
        local_props
      end

      def kit_global_props
        global = []

        kit_props.each do |key, value|
          value.kit == Playbook::KitBase && global.push({ key: key, value: value })
        end
        global
      end

      def get_values(prop)
        send("#{prop}_values") if respond_to?(send("#{prop}_values"))
      end

      def global_prop_data
        global_props = {}

        kit_global_props.each do |key, _value|
          name = key[:value].instance_variable_get(:@name)
          type = key[:value].class.to_s.split("::").last
          default = key[:value].instance_variable_get(:@default)
          values = get_values(key[:value].instance_variable_get(:@name).to_s)
          global_props[name.to_sym] = { "type": type, "default": default, "values": values }
        end
        global_props
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
