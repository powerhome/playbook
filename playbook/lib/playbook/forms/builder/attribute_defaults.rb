# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      # Shared helpers so form builder fields can mirror Rails text_field DX:
      # pull the model attribute and its validation errors unless the caller
      # explicitly passed those props.
      module AttributeDefaults
      private

        def form_attribute_value(name)
          return nil unless @object
          return nil unless @object.respond_to?(name)

          @object.public_send(name)
        end

        def form_attribute_error(name)
          return nil unless @object.respond_to?(:errors)

          messages = @object.errors.full_messages_for(name)
          messages.first.presence
        rescue NoMethodError
          nil
        end

        def apply_form_error!(props, name)
          return if props.key?(:error)

          error = form_attribute_error(name)
          props[:error] = error if error.present?
        end

        def serialize_date_picker_default(value)
          case value
          when Time, DateTime, ActiveSupport::TimeWithZone
            value.utc.iso8601
          when Date
            value.iso8601
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
        def resolve_dropdown_default(value, options)
          case value
          when Hash
            value
          when Array
            resolve_dropdown_array_default(value, options)
          else
            find_dropdown_option(value, options)
          end
        end

        def resolve_dropdown_array_default(values, options)
          return values if values.all? { |entry| entry.is_a?(Hash) }

          matched = values.filter_map { |entry| find_dropdown_option(entry, options) }
          matched.presence
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
