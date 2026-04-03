# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitApi < Playbook::KitBase
      prop :kit, type: Playbook::Props::String, required: true
      prop :dark, type: Playbook::Props::Boolean, default: false

      def padding_margin_values
        %w[none xxs xs sm md lg xl]
      end

      def local_prop_data
        schema_props.reject { |name, _| global_prop_names.include?(name.to_s) }
      end

      def global_prop_data
        symbolize_props(global_schema["props"] || {})
      end

    private

      def schema_props
        symbolize_props(kit_schema["props"] || {})
      end

      def kit_schema
        @kit_schema ||= begin
          path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_#{kit}/kit.schema.json")
          File.exist?(path) ? JSON.parse(File.read(path)) : {}
        end
      end

      def global_schema
        @global_schema ||= begin
          path = Playbook::Engine.root.join("app/pb_kits/playbook/utilities/global-props.schema.json")
          File.exist?(path) ? JSON.parse(File.read(path)) : {}
        end
      end

      def global_prop_names
        @global_prop_names ||= (global_schema["props"] || {}).keys
      end

      def symbolize_props(props)
        props.transform_values do |value|
          type = (value["type"] || "string").gsub(/;$/, "")
          values = value["values"]

          # Show true/false for boolean types
          values = %w[true false] if type == "boolean" && values.blank?

          {
            type: type,
            values: values,
            default: value["default"],
          }
        end
      end
    end
  end
end
