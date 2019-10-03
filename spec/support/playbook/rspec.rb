# frozen_string_literal: true

module Playbook
  module Rspec
    extend RSpec::Matchers::DSL

    matcher :define_prop do |prop_key|
      chain :of_type do |type_class|
        @type_class = type_class
      end

      chain :with_default do |default|
        @default = default
      end

      match do |subject_class|
        if @type_class && @default
          subject_class.props[prop_key].class == @type_class &&
            subject_class.props[prop_key].default == @default
        elsif @type_class && !@default
          subject_class.props[prop_key].class == @type_class
        elsif !@type_class && @default
          subject_class.props[prop_key].default == @default
        else
          !subject_class.props[prop_key].nil?
        end
      end

      failure_message do |subject_class|
        base_message = "expected #{subject_class} to define :#{prop_key} prop"
        type_message = "of #{@type_class} type"
        default_message = "with default of #{@default}"

        if @type_class && @default
          [base_message, type_message, default_message].join(" ")
        elsif @type_class && !@default
          [base_message, type_message].join(" ")
        elsif !@type_class && @default
          [base_message, default_message].join(" ")
        else
          base_message
        end
      end
    end

    matcher :define_partial do
      match do |subject_class|
        subject_class.instance_methods.include?(:to_partial_path)
      end
    end
  end
end
