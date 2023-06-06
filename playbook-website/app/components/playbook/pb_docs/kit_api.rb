# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitApi < Playbook::KitBase
      prop :kit, type: Playbook::Props::String, required: true
      prop :dark, type: Playbook::Props::Boolean, default: false

      def kit_local_props
        local = []
        kit_props.each do |key, value|
          value.kit != Playbook::KitBase && local.push({ key: key, value: value })
        end
        local
      end

      def padding_margin_values
        %w[none xxs xs sm md lg xl]
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
        global_props = {}
        global_prop_names = []
        global_prop_values = {}
        global_props_with_values = {}
        global_props_without_values = []
        parent_child_object = {}
        updated_global_props_with_values = {}

        # extracts the modules from kit_base.rb, which is where we import all the global props that we inject into every rails kit
        pb_module = Playbook::KitBase.included_modules.select { |mod| mod.to_s.include?("Playbook::") }

        # loops through the kits and extracts each prop with its values and pushes that to the global_props hash
        kit_props.each do |key, value|
          value.kit == Playbook::KitBase && global_props[key.to_sym] = value
        end

        # loops through the global_props and extracts the name of each prop and pushes that to global_prop_names array
        global_props.each do |name, _values|
          global_prop_names.push(name)
        end

        # Loops through each module in pb_module and searches for methods that end in _values, as these methods hold the values for each prop
        # we then save the values and type and push that to the values hash as a key value pair
        pb_module.each do |mod|
          mod.instance_methods.each do |method_name|
            next unless method_name.to_s.end_with?("_values")

            value = send(method_name)
            type = value.class
            global_prop_values[method_name.to_s.chomp("_values").to_sym] = { "type": type, "values": value }
          end
        end

        # loops through the global_prop_names array
        # then loops through the global_prop_values hash and extracts the values that have the same name found in global_prop_names
        # this loop helps ensure only global props values are actually extracted, as there could be other methods that end in _values in the modules we are iterating over
        # these verified global props with values are then pushed to the global_props_with_values hash
        global_prop_names.each do |name, _prop|
          global_prop_values.each do |key, value|
            global_props_with_values[key] = value if key == name
          end
        end

        # now we grab all the global_prop_names that do not have a matching key in global_prop_values.
        # This gives us any global prop that did not have any predefined value. like classname and dark
        global_props_without_values = global_prop_names - global_prop_values.keys

        # Loops through each module in pb_module and searches for methods that end in _options, as these methods hold all the props in the module
        # save the prop names prop values and  and parent module name to parent_child_object hash
        # this is a comprehensive list of all parent module and children props for edge cases like spacing.rb, that is not named after the props it represents
        pb_module.each do |mod|
          mod.instance_methods.each do |method_name|
            next unless method_name.to_s.end_with?("_options")

            props = send(method_name)
            parent = mod.to_s.split("::").last
            values = send("#{parent.underscore}_values")
            parent_child_object[parent] = { "props": props, "values": values }
          end
        end

        # loops through each object in parent_child_object and extracts its children (props and values)
        # loops through each child and extracts the individual props
        # Checks if the props match any of the props in global_props_without_values
        # if it does, then we push that prop to global_props_with_values hash
        # This extracts the props in the spacing.rb file and any file that is not named after the props it represents
        parent_child_object.each do |_parent, children|
          children.each do |_child, props|
            props.each do |prop, _value|
              type = children[:values].class
              values = children[:values]
              global_props_with_values[prop] = { "type": type, "values": values } if global_props_without_values.include?(prop)
            end
          end
        end

        # loop through the global_props hash and the global_props_with_values hash.
        # extract the props from global_props that are not found in global_props_with_values into updated_global_props_with_values
        # This is the last piece that grabs the global props that did not have values at all, like classname and dark, and adds it to our hash
        global_props.each do |prop, value|
          unless global_props_with_values.include?(prop)
            type = value.class.to_s.split("::").last
            updated_global_props_with_values[prop] = { "type": type }
          end
        end

        # Merge updated_global_props_with_values into global_props_with_values
        # global_props_with_values will now hold all the global props thier values and type
        global_props_with_values.merge!(updated_global_props_with_values)

        global_props_with_values
      end

      def global_prop_data
        global_props = {}

        kit_global_props.each do |key, value|
          type = value[:type]
          values = value[:values]
          global_props[key] = { "type": type, "values": values }
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
