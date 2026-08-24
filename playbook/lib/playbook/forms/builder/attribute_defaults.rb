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

        def resolve_dropdown_default(value, options)
          return value if value.is_a?(Hash) || value.is_a?(Array)
          return value if options.blank?

          Array(options).find do |option|
            next false unless option.respond_to?(:[])

            option = option.transform_keys(&:to_s)
            option["id"].to_s == value.to_s || option["value"].to_s == value.to_s
          end || value
        end
      end
    end
  end
end
