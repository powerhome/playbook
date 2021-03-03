module Playbook
  module Props
    class TextInputAddOn < Hash
      def validate(value)
        @value = value
        return super(@value) if @value.empty?
        super(@value) &&
          icon_valid? &&
          border_valid? &&
          alignment_valid?
      end

      private

      def icon_valid?
        @value.dig(:icon).is_a? ::String
      end

      def border_valid?
        return true unless (border = @value.dig(:border))
        border == true || border == false
      end

      def alignment_valid?
        return true unless (align = @value.dig(:alignment))
        align.in? %w[left right]
      end
    end
  end
end
