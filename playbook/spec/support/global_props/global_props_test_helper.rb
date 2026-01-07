# frozen_string_literal: true

# Helper module for testing global props
module GlobalPropsTestHelper
  # Test that a global prop generates correct classnames
  #
  # @param prop_name [Symbol] The name of the global prop (e.g., :display, :flex)
  # @param valid_values [Array] Array of valid values to test
  # @param classname_pattern [Proc] Lambda that generates expected classname from value
  # @param responsive_pattern [Proc, nil] Optional lambda for responsive classnames
  #   When provided, tests responsive breakpoints (xs, sm, md, lg, xl)
  #   Example: ->(size, v) { "display_#{size}_#{v}" }
  #
  # Usage (direct values only):
  #   test_global_prop(
  #     :display,
  #     %w[block inline flex],
  #     ->(v) { "display_#{v}" }
  #   )
  #
  # Usage (with responsive breakpoints):
  #   test_global_prop(
  #     :display,
  #     %w[block inline flex],
  #     ->(v) { "display_#{v}" },
  #     responsive_pattern: ->(size, v) { "display_#{size}_#{v}" }
  #   )
  def test_global_prop(prop_name, valid_values, classname_pattern, responsive_pattern: nil)
    describe "##{prop_name}" do
      it "returns correct class names", :aggregate_failures do
        screen_sizes = %w[xs sm md lg xl]

        valid_values.each do |value|
          # Test direct prop value
          expected_classname = classname_pattern.call(value)
          instance = subject.new({ prop_name => value })
          expect(instance.classname).to include(expected_classname)

          # Test responsive breakpoints if pattern provided
          next unless responsive_pattern

          screen_sizes.each do |size|
            responsive_obj = { size => value }
            expected_responsive_classname = responsive_pattern.call(size, value)
            responsive_instance = subject.new({ prop_name => responsive_obj })
            expect(responsive_instance.classname).to include(expected_responsive_classname)
          end
        end
      end
    end
  end
end

RSpec.configure do |config|
  config.extend GlobalPropsTestHelper
end
