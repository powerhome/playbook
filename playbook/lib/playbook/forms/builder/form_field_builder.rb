# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      class FormFieldBuilder < Module
        MASK_PATTERNS = {
          "currency" => '^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$',
          "zip_code" => '\d{5}',
          "postal_code" => '\d{5}-\d{4}',
          "ssn" => '\d{3}-\d{2}-\d{4}',
          "credit_card" => '\d{4} \d{4} \d{4} \d{4}',
          "cvv" => '\d{3,4}',
        }.freeze

        def initialize(method_name, kit_name:)
          define_method method_name do |name, props: {}, **options, &block|
            props   = props.dup
            options = Hash(options)

            options[:skip_default_ids] = false unless options.key?(:skip_default_ids)
            options[:required] = true if props[:required]
            options[:placeholder] = props[:placeholder] || ""
            options[:type] = props[:type] if props.key?(:type)
            options[:value] = props[:value] if props.key?(:value)
            options[:disabled] = true if props.key?(:disabled) && props[:disabled]
            if props.key?(:disabled)
              cursor_style = props[:disabled] ? "not-allowed" : "pointer"
              existing_style = options[:style] || ""

              options[:style] =
                existing_style.empty? ? "cursor: #{cursor_style}" : "#{existing_style}; cursor: #{cursor_style}"
            end
            if props.key?(:autocomplete)
              options[:autocomplete] = props[:autocomplete] == true ? nil : (props[:autocomplete].presence || "off")
            end
            if props.key?(:mask) && props[:mask].present?
              options[:mask] = props[:mask]
              options[:data] = (options[:data] || {}).merge(pb_input_mask: true)
              options[:pattern] = MASK_PATTERNS[props[:mask]]
            end

            if props.key?(:validation)
              validation = props[:validation]
              options[:pattern] = validation[:pattern] if validation[:pattern].present?
              options[:data] = (options[:data] || {}).merge(message: validation[:message]) if validation[:message].present?
            end

            options[:data] = (options[:data] || {}).merge(pb_emoji_mask: true) if props.key?(:emoji_mask) && props[:emoji_mask]

            input = super(name, **options, &block)

            input_id = input[/\bid="([^"]+)"/, 1] || "#{@object_name}_#{name}"

            if props[:label] == true
              # If using required_indicator, extract just the text and let the template handle rendering
              props[:label] = if props[:required_indicator]
                                if @object && @object.class.respond_to?(:human_attribute_name)
                                  @object.class.human_attribute_name(name)
                                else
                                  name.to_s.humanize
                                end
                              else
                                # Legacy behavior .(generate full label HTML) left untouched
                                @template.label(@object_name, name)
                              end
            elsif props[:label].is_a?(String)
              # If using required_indicator, keep as text; otherwise wrap in label_tag
              props[:label] = @template.label_tag(input_id, props[:label]) unless props[:required_indicator]
            end

            @template.pb_rails(kit_name, props: props) do
              input
            end
          end
        end
      end
    end
  end
end
