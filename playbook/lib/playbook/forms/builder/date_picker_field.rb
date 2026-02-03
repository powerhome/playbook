# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def date_picker(name, props: {})
        prefix = @object_name
        html_attribute_name = "#{prefix}[#{name}]"
        html_id = "#{prefix}_#{name}"

        if props[:label] == true
          props[:label] = if @object && @object.class.respond_to?(:human_attribute_name)
                            @object.class.human_attribute_name(name)
                          else
                            name.to_s.humanize
                          end
        end

        props[:label] = "Date Picker" if props[:label].nil?

        props[:name] = html_attribute_name
        props[:picker_id] = html_id

        @template.pb_rails("date_picker", props: props)
      end
    end
  end
end
