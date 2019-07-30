# frozen_string_literal: true

module Playbook
  module PbKit
    class Base
      #============= Default props =============
      def aria(ui_aria = {})
        merge_value(configured_aria, ui_aria)
      end

      def classname(ui_classes = "")
        concat_value(configured_classname, ui_classes)
      end

      def data(ui_data = {})
        merge_value(configured_data, ui_data)
      end

      def id(ui_id = nil)
        default_value(configured_id, ui_id)
      end

      #============= Type checking =============
      def is_true?(value)
        is_boolean?(value) && value == true
      end

      def is_string?(value)
        value.is_a? String
      end

      def is_integer?(value)
        value.is_a? Integer
      end

      def is_boolean?(value)
        [true, false].include? value
      end

      def one_of?(value, options = [])
        options.include? value
      end

      def is_set?(value)
        value != default_configuration
      end

      #============= Default value =============
      def default_value(value, default_value)
        is_set?(value) ? value : default_value
      end

      def adjusted_value(value, adjusted_value, default_value)
        is_set?(value) ? adjusted_value : default_value
      end

      def concat_value(value, value2)
        is_set?(value) ? value2 + " " + value : value2
      end

      def merge_value(value, value2)
        value2 ||= {}
        is_set?(value) ? value.merge(value2) : value2
      end

      def one_of_value(value, options = [], default = "")
        if is_set?(value)
          options.include?(value) ? value : default
        else
          default
        end
      end

      def true_value(value, true_value = "", false_value = "")
        if is_set?(value)
          is_true?(value) ? true_value : false_value
        else
          false_value
        end
      end

      def false_value(value, false_value = "", true_value = "")
        if is_set?(value)
          is_true?(value) ? true_value : false_value
        else
          false_value
        end
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
    end
  end
end
