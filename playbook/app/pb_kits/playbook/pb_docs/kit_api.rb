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

        pb_module = Playbook::KitBase.included_modules.select { |mod| mod.to_s.include?("Playbook::") }

        values = {}
        pb_module.each do |mod|
          mod.instance_methods.each do |method_name|
            next unless method_name.to_s.end_with?("_values")

            value = send(method_name)
            type = value.class
            values[method_name.to_s.chomp("_values").to_sym] = { "type": type, "values": value }
          end
        end

        # pp values

        global_props_with_values = {}
        global_props_without_values = []

        global.each do |name, _prop|
          prop_name = name[:value].instance_variable_get(:@name)
          pp prop_name
          # loop through values and extract values that have key that matches prop_name
          values.each do |key, value|
            # for each key that matches prop_name push key value pair
            if key == prop_name
              global_props_with_values[key] = value
            else
              global_props_without_values << prop_name unless global_props_without_values.include?(prop_name)
            end
          end
        end

        puts global_props_with_values
        puts "without values #{global_props_without_values}"

        global
      end

      def get_values(prop)
        # send("#{prop}_values") if send("#{prop}_values").present?
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
