# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def toggle_field(name, props: {}, **options)
        label_text = @template.label(@object_name, name) if props[:label] == true
        options[:required] = true if props[:required]
        props[:margin_bottom] = "sm"
        props[:form_spacing] = true

        # Default values like Rails' check_box behavior
        checked_value = options[:checked_value] || "1"
        unchecked_value = options[:unchecked_value] || "0"
        include_hidden = options.fetch(:include_hidden, true)

        # Get field name (handle both object_name[field] and custom name)
        field_name = options[:name] || "#{@object_name}[#{name}]"

        # Determine if checked (similar to Rails' check_box logic)
        is_checked = if options.key?(:checked)
                       options[:checked]
                     elsif @object.respond_to?(name)
                       value = @object.public_send(name)
                       value == checked_value || value == true || value == "1"
                     else
                       false
                     end

        # Build the input - hidden field + checkbox (like Rails' check_box)
        inputs = []

        # Add hidden field for unchecked value (like Rails does automatically)
        inputs << @template.hidden_field_tag(field_name, unchecked_value, id: nil) if include_hidden

        # Build checkbox input for toggle
        checkbox_options = options.dup
        checkbox_options.delete(:checked_value)
        checkbox_options.delete(:unchecked_value)
        checkbox_options.delete(:include_hidden)
        checkbox_options.delete(:name) # We'll set it explicitly
        checkbox_options[:id] ||= "#{sanitized_object_name}_#{sanitized_attribute_name(name)}"

        checkbox_input = @template.check_box_tag(
          field_name,
          checked_value,
          is_checked,
          checkbox_options
        )

        inputs << checkbox_input
        input = @template.safe_join(inputs)

        # Wrap in toggle kit
        # The toggle kit will use the content (our input) instead of calling object.input
        # But we still need to pass checked for CSS class styling
        toggle_props = props.dup
        toggle_props[:size] = props[:size] || "sm"
        toggle_props[:checked] = is_checked
        toggle_props[:disabled] = options[:disabled] || false
        # NOTE: We don't pass name/value to toggle props since we're providing content

        if props[:label]
          @template.pb_rails("caption", props: { text: label_text, margin_bottom: "xs" }) +
            @template.pb_rails("toggle", props: toggle_props) do
              input
            end
        else
          @template.pb_rails("toggle", props: toggle_props) do
            input
          end
        end
      end

    private

      def sanitized_object_name
        @object_name.to_s.gsub(/\]\[|[^-a-zA-Z0-9:.]/, "_").delete("]")
      end

      def sanitized_attribute_name(name)
        name.to_s.gsub(/[^a-zA-Z0-9_]/, "_")
      end
    end
  end
end
