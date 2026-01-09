# frozen_string_literal: true

require "json"

module Playbook
  # Playbook Design Tokens for Rails
  #
  # This module provides access to Playbook's design tokens (colors, typography, etc.)
  # from Ruby/Rails code, mirroring what's available in React via the tokens.js exports.
  #
  # Colors are generated from SCSS via: rake tokens:generate_colors
  # Source of truth: app/pb_kits/playbook/tokens/_colors.scss
  #
  # @example
  #   Playbook::Tokens.colors[:data_4]  # => "#1CA05C"
  #   Playbook::Tokens.colors.data_4    # => "#1CA05C"
  #   Playbook::Tokens.colors[:royal]   # => "#0056CF"
  #
  module Tokens
    class << self
      # Load colors from generated JSON file
      #
      # @return [ColorHash] colors with both hash and method access
      #
      # @example Hash-style access
      #   Playbook::Tokens.colors[:data_4]  # => "#1CA05C"
      #   Playbook::Tokens.colors[:royal]   # => "#0056CF"
      #
      # @example Method-style access
      #   Playbook::Tokens.colors.data_4    # => "#1CA05C"
      #   Playbook::Tokens.colors.royal     # => "#0056CF"
      #
      def colors
        @colors ||= begin
          json_path = File.join(__dir__, "tokens", "colors.json")
          hash = JSON.parse(File.read(json_path), symbolize_names: true)
          ColorHash.new(hash)
        end
      end

      # Reload colors from JSON (useful after regenerating)
      def reload_colors!
        @colors = nil
        colors
      end
    end

    # Custom hash wrapper that supports both hash access and method access
    # Provides: colors[:data_4] and colors.data_4
    class ColorHash
      def initialize(hash)
        @hash = hash.freeze
      end

      # Hash-style access: colors[:data_4]
      def [](key)
        @hash[key.to_sym]
      end

      # Method-style access: colors.data_4
      def method_missing(method_name, *args, &block)
        key = method_name.to_sym
        if @hash.key?(key)
          @hash[key]
        else
          super
        end
      end

      def respond_to_missing?(method_name, include_private = false)
        @hash.key?(method_name.to_sym) || super
      end

      # Return all colors as a frozen hash
      def to_h
        @hash
      end

      alias to_hash to_h

      # Return array of all color keys
      def keys
        @hash.keys
      end

      # Return array of all color values
      def values
        @hash.values
      end

      # Check if a color key exists
      def key?(key)
        @hash.key?(key.to_sym)
      end

      alias has_key? key?
    end
  end
end
