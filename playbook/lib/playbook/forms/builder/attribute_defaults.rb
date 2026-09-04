# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      # Shared helpers so form builder fields can mirror Rails text_field DX:
      # pull the model attribute and its validation errors unless the caller
      # explicitly passed those props.
      module AttributeDefaults
      private

        # Prefer *_before_type_cast when the value came from user input (Rails
        # text_field behavior) so invalid typed input is re-rendered for correction
        # instead of the nil/blank cast attribute after a failed validation.
        def form_attribute_value(name)
          return nil unless @object
          return nil unless @object.respond_to?(name)

          before_type_cast = "#{name}_before_type_cast"
          if form_attribute_came_from_user?(name) && @object.respond_to?(before_type_cast)
            @object.public_send(before_type_cast)
          else
            @object.public_send(name)
          end
        end

        def form_attribute_came_from_user?(name)
          came_from_user = "#{name}_came_from_user?"
          !@object.respond_to?(came_from_user) || @object.public_send(came_from_user)
        end

        def form_attribute_error(name)
          return nil unless @object.respond_to?(:errors)

          messages = @object.errors.full_messages_for(name)
          messages.first.presence
        rescue NoMethodError
          nil
        end

        def apply_form_error!(props, name)
          return if props.key?(:error) # explicit error: (including nil) wins

          error = form_attribute_error(name)
          props[:error] = error if error.present?
        end

        # Use wall-clock components from the model value's own zone/offset.
        # Do not convert to UTC or emit a zoned ISO timestamp — browsers reparse
        # those as absolute instants and can shift the selected calendar day.
        # Date-only must include T00:00:00 (no Z): bare YYYY-MM-DD is UTC midnight
        # in JS/Flatpickr and shows the previous day in US timezones.
        def serialize_date_picker_default(value, enable_time: false)
          case value
          when Time, DateTime, ActiveSupport::TimeWithZone
            if enable_time
              value.strftime("%Y-%m-%dT%H:%M:%S")
            else
              value.strftime("%Y-%m-%dT00:00:00")
            end
          when Date
            "#{value.iso8601}T00:00:00"
          else
            value.presence&.to_s
          end
        end

        def serialize_time_picker_default(value)
          case value
          when Time, DateTime, ActiveSupport::TimeWithZone
            value.strftime("%H:%M")
          else
            value.presence&.to_s
          end
        end

        # Dropdown only accepts option hashes for default_value. Never return a
        # bare id/string — that raises in Dropdown#input_default_value.
        def resolve_dropdown_default(value, options, multi_select: false)
          case value
          when Hash
            value
          when Array
            resolve_dropdown_array_default(value, options, multi_select: multi_select)
          else
            find_dropdown_option(value, options)
          end
        end

        def resolve_dropdown_array_default(values, options, multi_select: false)
          return values if multi_select && values.all? { |entry| entry.is_a?(Hash) }
          return values.first if !multi_select && values.first.is_a?(Hash)

          matched = values.filter_map { |entry| find_dropdown_option(entry, options) }
          return matched.presence if multi_select

          matched.first
        end

        def find_dropdown_option(value, options)
          return nil if options.blank?

          Array(options).find do |option|
            next false unless option.respond_to?(:transform_keys)

            normalized = option.transform_keys(&:to_s)
            normalized["id"].to_s == value.to_s || normalized["value"].to_s == value.to_s
          end
        end
      end
    end
  end
end
