# frozen_string_literal: true

require_relative "../pb_dropdown/quickpick_helper"

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
      prop :interactive_filters, type: Playbook::Props::HashArray, default: []

      def classname
        generate_classname("pb_filter_kit").rstrip
      end

      def interactive_config_for(filter_name)
        interactive_filters_index[filter_name.to_s]
      end

      def interactive_value(config, key)
        return nil if config.nil?

        config[key]
      end

      def interactive_options(config)
        return [] if config.nil?

        config = config.with_indifferent_access
        if interactive_quickpick?(config) && Array(config[:options]).blank?
          return Playbook::PbDropdown::QuickpickHelper.get_quickpick_options(
            range_ends_today: config[:range_ends_today] || false,
            custom_quick_pick_dates: config[:custom_quick_pick_dates] || {}
          )
        end

        Array(config[:options])
      end

      def interactive_option_value(config, option)
        config = config.with_indifferent_access
        option = option.with_indifferent_access

        if config[:type].to_s == "dropdown"
          option[:id] || option[:value] || option[:label]
        else
          option[:value] || option[:text] || option[:label]
        end
      end

      def interactive_option_label(option, fallback = nil)
        option = option.with_indifferent_access
        option[:label] || option[:text] || fallback
      end

      def interactive_display_value(config, raw_value)
        return raw_value if config.nil?
        return raw_value unless %w[select dropdown].include?(config[:type].to_s)

        match = interactive_options(config).find do |opt|
          interactive_option_value(config, opt).to_s == raw_value.to_s
        end
        return raw_value unless match

        interactive_option_label(match, raw_value)
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

    private

      def interactive_filters_index
        @interactive_filters_index ||= Array(interactive_filters).each_with_object({}) do |entry, acc|
          next unless entry.is_a?(Hash)

          config = entry.with_indifferent_access
          name = config[:name].to_s
          acc[name] = config if name.present?
        end
      end

      def interactive_quickpick?(config)
        config[:type].to_s == "dropdown" && config[:variant].to_s == "quickpick"
      end
    end
  end
end
