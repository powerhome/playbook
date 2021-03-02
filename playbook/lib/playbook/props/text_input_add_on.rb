module Playbook
  module Props
    class TextInputAddOn < Hash
      ALIGNMENT_OPTIONS = %w[left right]

      def validate(value)
        @value = value
        super(value) &&
          icon_valid? &&
          border_valid? &&
          alignment_valid?
      end

      private

      attr_reader :value

      def icon_valid?
        value.dig('icon').is_a? ::String
      end

      def border_valid?
        return unless (border = value.dig('border'))
        border.is_a? ::Boolean
      end

      def alignment_valid?
        return unless (align = value.dig('alignment'))
        align.in? ALIGNMENT_OPTIONS
      end
    end
  end
end
