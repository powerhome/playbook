# frozen_string_literal: true

require_relative "quickpick_helper"

module Playbook
  module PbDropdown
    class Dropdown < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []
      prop :label, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :error, type: Playbook::Props::String
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :default_value
      prop :blank_selection, type: Playbook::Props::String,
                             default: ""
      prop :custom_quick_pick_dates, type: Playbook::Props::HashProp,
                                     default: {}
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default subtle quickpick],
                     default: "default"
      prop :separators, type: Playbook::Props::Boolean,
                        default: true
      prop :autocomplete, type: Playbook::Props::Boolean,
                          default: false
      prop :searchbar, type: Playbook::Props::Boolean,
                       default: false
      prop :multi_select, type: Playbook::Props::Boolean,
                          default: false
      prop :form_pill_props, type: Playbook::Props::HashProp,
                             default: {}
      prop :range_ends_today, type: Playbook::Props::Boolean,
                              default: false
      prop :controls_end_id, type: Playbook::Props::String,
                             default: ""
      prop :controls_start_id, type: Playbook::Props::String,
                               default: ""
      prop :clearable, type: Playbook::Props::Boolean,
                       default: true
      prop :start_date_id, type: Playbook::Props::String,
                           default: "start_date_id"
      prop :start_date_name, type: Playbook::Props::String,
                             default: "start_date_name"
      prop :end_date_id, type: Playbook::Props::String,
                         default: "end_date_id"
      prop :end_date_name, type: Playbook::Props::String,
                           default: "end_date_name"
      prop :placeholder, type: Playbook::Props::String

      def data
        Hash(prop(:data)).merge(
          pb_dropdown: true,
          pb_dropdown_multi_select: multi_select,
          pb_dropdown_variant: variant,
          pb_dropdown_clearable: clearable,
          form_pill_props: form_pill_props.to_json,
          start_date_id: variant == "quickpick" ? start_date_id : nil,
          end_date_id: variant == "quickpick" ? end_date_id : nil,
          controls_start_id: variant == "quickpick" && controls_start_id.present? ? controls_start_id : nil,
          controls_end_id: variant == "quickpick" && controls_end_id.present? ? controls_end_id : nil
        ).compact
      end

      def classname
        generate_classname("pb_dropdown", variant, separators_class)
      end

    private

      def error_class
        error.present? ? " error" : ""
      end

      def input_default_value
        return "" unless default_value.present?

        if variant == "quickpick"
          d = default_value.to_s.downcase
          matched_option = quickpick_options.find do |opt|
            opt[:label].downcase == d
          end
          return matched_option[:id] if matched_option

          ""
        elsif multi_select
          default_value.map { |v| v.transform_keys(&:to_s)["id"] }.join(",")
        else
          default_value.transform_keys(&:to_s)["id"]
        end
      end

      def separators_class
        separators ? nil : "separators_hidden"
      end

      def options_with_blank
        dropdown_options = variant == "quickpick" ? quickpick_options : options
        blank_selection.present? ? [{ id: "", value: "", label: blank_selection }] + dropdown_options : dropdown_options
      end

      def quickpick_options
        QuickpickHelper.get_quickpick_options(
          range_ends_today: range_ends_today,
          custom_quick_pick_dates: custom_quick_pick_dates
        )
      end
    end
  end
end
