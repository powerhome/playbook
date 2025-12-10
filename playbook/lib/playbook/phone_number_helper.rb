# frozen_string_literal: true

module Playbook
  module PhoneNumberHelper
    # Formats a phone number according to Playbook standards
    #
    # @param phone_number [String] The raw phone number string (can include formatting characters)
    # @param type [String] The type of phone number: 'US' (default), 'extension', or 'international'
    # @return [String, nil] Formatted phone number string, or nil if formatting fails
    #
    # @example
    #   format_phone_number("2125551234") # => "(212) 555-1234"
    #   format_phone_number("12125551234", type: "US") # => "(212) 555-1234" (leading 1 removed)
    #   format_phone_number("1234", type: "extension") # => "1234"
    #   format_phone_number("+44 20 7946 0958", type: "international") # => "+44 20 7946 0958"
    def format_phone_number(phone_number, type: "US")
      return nil if phone_number.blank?

      # International phone numbers are returned as-is
      return phone_number if type == "international"

      # Remove all non-digit characters
      cleaned = phone_number.to_s.gsub(/\D/, "")

      # Handle extensions (4-digit numbers)
      if type == "extension"
        return cleaned if cleaned.match?(/^\d{4}$/)

        return nil
      end

      # Format US phone numbers using Rails' number_to_phone helper
      # This handles both 10-digit and 11-digit (with country code) numbers
      return nil unless cleaned.match?(/^(1|)?\d{10}$/)

      # Remove leading 1 if present for formatting
      cleaned_number = cleaned.sub(/^1/, "")
      number_to_phone(cleaned_number, area_code: true)
    end

    # Checks if a phone number is valid for formatting
    #
    # @param phone_number [String] The phone number string to validate
    # @param type [String] The type of phone number (defaults to 'US')
    # @return [Boolean] true if the phone number can be formatted, false otherwise
    #
    # @example
    #   valid_phone_number?("2125551234") # => true
    #   valid_phone_number?("1234", type: "extension") # => true
    #   valid_phone_number?("abc") # => false
    def valid_phone_number?(phone_number, type: "US")
      return false if phone_number.blank?

      return phone_number.present? if type == "international"

      if type == "extension"
        cleaned = phone_number.to_s.gsub(/\D/, "")
        return cleaned.match?(/^\d{4}$/)
      end

      cleaned = phone_number.to_s.gsub(/\D/, "")
      cleaned.match?(/^(1|)?\d{10}$/)
    end
  end
end
