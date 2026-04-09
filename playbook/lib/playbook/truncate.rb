# frozen_string_literal: true

module Playbook
  module Truncate
    def self.included(base)
      base.prop :truncate
    end

    TRUNCATE_VALUES = %w[1 2 3 4 5].freeze

    def truncate_props
      value = truncate
      return nil unless value

      "truncate_#{value}" if TRUNCATE_VALUES.include?(value.to_s)
    end

    def truncate_options
      { truncate: "truncate" }
    end

    def truncate_values
      TRUNCATE_VALUES
    end
  end
end
