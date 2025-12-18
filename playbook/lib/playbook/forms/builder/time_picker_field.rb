# frozen_string_literal: true

module Playbook
  module Forms
    class Builder
      def time_picker(name, props: {})
        prefix = @object_name
        html_attribute_name = "#{prefix}[#{name}]"
        html_id = "#{prefix}_#{name}"

        if props[:label] == true
          props[:label] = name.to_s.humanize
        elsif props[:label].nil?
          props[:label] = "Time Picker"
        end

        props[:name] = html_attribute_name
        props[:id] = html_id

        @template.pb_rails("time_picker", props: props)
      end
    end
  end
end
