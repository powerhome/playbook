# frozen_string_literal: true

module Playbook
  module Props
    class Error < StandardError; end

    class Base
      attr_reader :default, :deprecated, :required, :name, :kit

      def initialize(options = {})
        @default = options.fetch(:default, nil)
        @deprecated = options.fetch(:deprecated, false)
        @required = options.fetch(:required, false)
        @name = options.fetch(:name, nil)
        @kit = options.fetch(:kit, nil)
      end

      def value(value)
        value.nil? ? @default : value
      end

      def validate!(input_value)
        warn("#{kit} Kit: The prop '#{name}' is deprecated and will be removed in a future release!") if deprecated && input_value # TODO: add some color for pop

        raise(Playbook::Props::Error, "#{kit} prop '#{name}' of type #{inspect.class} is required and needs a value") if required && input_value.nil?

        validate(value(input_value)) ||
          raise(Playbook::Props::Error, "#{kit} has invalid value of '#{input_value.inspect}' for prop '#{name}' of type #{inspect.class}")
      end

      def validate(_value)
        true
      end

    private

      def warn(message)
        log("Prop Warning: #{message}")
      end

      def log(message)
        logger = ActiveSupport::Logger.new($stdout)
        @logger ||= ActiveSupport::TaggedLogging.new(logger)
        @logger.log(0, message)
      end
    end
  end
end
