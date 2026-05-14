# frozen_string_literal: true

module Playbook
  module PbFilter
    class Filter < Playbook::KitBase
      prop :filters, type: Playbook::Props::HashArray, default: [{ name: "" }]
      prop :sort_menu, type: Playbook::Props::HashArray, default: [{}]
      prop :results, type: Playbook::Props::Numeric
      prop :template, type: Playbook::Props::Enum,
                      values: %w[default single filter_only sort_only],
                      default: "default"
      prop :background, type: Playbook::Props::Boolean, default: true
      prop :max_height
      prop :min_width, default: "auto"
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[top bottom left right top-start top-end bottom-start bottom-end right-start right-end left-start left-end],
                       default: "bottom-start"
      prop :popover_props, type: Playbook::Props::HashProp,
                           default: {}
      prop :interactive_filters, type: Playbook::Props::HashArray, default: [{}]

      def classname
        generate_classname("pb_filter_kit").rstrip
      end

      def interactive_config_for(filter_name)
        target = filter_name.to_s
        Array(interactive_filters).each do |entry|
          next unless entry.is_a?(Hash)

          name_val = (entry[:name] || entry["name"]).to_s
          return entry if name_val == target
        end
        nil
      end

      def interactive_value(config, key)
        return nil if config.nil?

        config[key] || config[key.to_s]
      end

      def interactive_display_value(config, raw_value)
        return raw_value if config.nil?

        type = interactive_value(config, :type).to_s
        return raw_value unless %w[select dropdown].include?(type)

        options = Array(interactive_value(config, :options))
        match = options.find do |opt|
          (opt[:value] || opt["value"]).to_s == raw_value.to_s
        end
        return raw_value unless match

        match[:label] || match["label"] || match[:text] || match["text"] || match[:value] || match["value"]
      end

      def result_text
        case results
        when 1
          "#{results} Result"
        when nil
          nil
        else
          "#{number_with_delimiter(results)} Results"
        end
      end

      def wrapper(&block)
        if background
          pb_rails("card", props: { padding: "none" }, &block)
        else
          capture(&block)
        end
      end

      def sort_icon(direction)
        case direction
        when "asc"
          "arrow-up-short-wide"
        when "desc"
          "arrow-down-wide-short"
        else
          ""
        end
      end
    end
  end
end
