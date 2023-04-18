# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitApi < Playbook::KitBase
      prop :kit, type: Playbook::Props::String, required: true

      def kit_local_props
        local = []
        kit_props.each do |key, value|
          # puts key
          # puts value
          value.kit != Playbook::KitBase && local.push({ key: key, value: value })
        end
        local
      end

      def local_prop_data
        local_props = []

        kit_local_props.each do |key, _value|
          # Itterate over values
          # grab the: Name, Type, Default, Values
          # puts key
          # puts "THIS IS THE NAME: ========== #{key[:value].instance_variable_get(:@name)}"
          name = key[:value].instance_variable_get(:@name)
          # puts "THIS IS THE TYPE: ========== #{key[:value]}"
          type = key[:value].class.to_s.split("::").last
          # puts "THIS IS THE DEFAULT: ========== #{key[:value].instance_variable_get(:@default)}"
          default = key[:value].instance_variable_get(:@default)
          # puts "THIS IS THE DEFAULT: ========== #{key[:value].instance_variable_get(:@values)}"
          values = key[:value].instance_variable_get(:@values)

          local_props.push([{ key: "name", value: name }, { key: "type", value: type }, { key: "default", value: default }, { key: "values", value: values }])
          # local_props.push({ key: "type", value: type })
          # local_props.push({ key: "default", value: default })
          # local_props.push({ key: "values", value: values })

          # puts Time.current
          # key.each do |prop|
          #   puts prop[:values]
          # end
          # puts key
          # puts key[:value].instance_variable_get(:@values)
        end
        local_props
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
