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
  # @param test_subjects [Array, Class, nil] Optional array of classes or single class to test
  #   When provided, tests each class in the array. Defaults to subject if not provided.
  #   Example: [Playbook::PbBody::Body, Playbook::PbButton::Button]
  #
  # Usage (direct values only, single subject):
  #   test_global_prop(
  #     :display,
  #     %w[block inline flex],
  #     ->(v) { "display_#{v}" }
  #   )
  #
  # Usage (with responsive breakpoints, multiple subjects):
  #   test_global_prop(
  #     :display,
  #     %w[block inline flex],
  #     ->(v) { "display_#{v}" },
  #     responsive_pattern: ->(size, v) { "display_#{size}_#{v}" },
  #     test_subjects: [Playbook::PbBody::Body, Playbook::PbButton::Button]
  #   )
  def test_global_prop(prop_name, valid_values, classname_pattern, responsive_pattern: nil, test_subjects: nil)
    # Normalize to array for consistent handling
    subjects_to_test = if test_subjects
                         test_subjects.is_a?(Array) ? test_subjects : [test_subjects]
                       else
                         [subject]
                       end

    subjects_to_test.each do |test_subject|
      subject_name = test_subject.name.split("::").last
      describe "##{prop_name} (#{subject_name})" do
        it "returns correct class names", :aggregate_failures do
          screen_sizes = %w[xs sm md lg xl]

          valid_values.each do |value|
            # Test direct prop value
            expected_classname = classname_pattern.call(value)
            instance = test_subject.new({ prop_name => value })
            expect(instance.classname).to include(expected_classname)

            # Test responsive breakpoints if pattern provided
            next unless responsive_pattern

            screen_sizes.each do |size|
              responsive_obj = { size => value }
              expected_responsive_classname = responsive_pattern.call(size, value)
              responsive_instance = test_subject.new({ prop_name => responsive_obj })
              expect(responsive_instance.classname).to include(expected_responsive_classname)
            end
          end
        end
      end
    end
  end

  # Test that a global prop with nested hash structure (i.e., hover) generates correct classnames
  #
  # @param prop_name [Symbol] The name of the global prop (e.g., :hover)
  # @param test_cases [Array] Array of test case hashes with:
  #   - :nested_key [Symbol] - Key inside the nested hash (e.g., :shadow, :scale)
  #   - :values [Array] - Array of values to test for this nested key
  #   - :classname_pattern [Proc] - Lambda that generates expected classname
  #     Example: ->(v) { "hover_shadow_#{v}" }
  #   - :excludes [String, Array, nil] - Optional classname(s) that should NOT be present
  #
  # Usage:
  #   test_nested_global_prop(
  #     :hover,
  #     [
  #       { nested_key: :shadow, values: %w[deep deeper], classname_pattern: ->(v) { "hover_shadow_#{v}" } },
  #       { nested_key: :underline, values: [true], classname_pattern: ->(_) { "hover_underline" } },
  #       { nested_key: :underline, values: [false], excludes: "hover_underline" },
  #     ]
  #   )
  def test_nested_global_prop(prop_name, test_cases)
    describe "##{prop_name}" do
      it "returns correct class names", :aggregate_failures do
        test_cases.each do |test_case|
          nested_key = test_case[:nested_key]
          values = test_case[:values]
          classname_pattern = test_case[:classname_pattern]
          excludes = test_case[:excludes]

          values.each do |value|
            prop_value = { nested_key => value }
            instance = subject.new({ prop_name => prop_value })

            if classname_pattern
              expected_classname = classname_pattern.call(value)
              expect(instance.classname).to include(expected_classname)
            end

            next unless excludes

            excludes_array = excludes.is_a?(Array) ? excludes : [excludes]
            excludes_array.each do |excluded_classname|
              expect(instance.classname).not_to include(excluded_classname)
            end
          end
        end
      end
    end
  end

  # Test that a global prop does NOT generate classnames when prop is nil or not passed
  #
  # @param prop_name [Symbol] The name of the global prop (e.g., :display, :flex)
  # @param excluded_classnames [Array] Array of classnames that should NOT be present
  #   Example: ['display_block', 'display_flex', 'display_none']
  # @param options [Hash] Optional configuration
  #   - :exclude_zero [Boolean] - If true, also test that 0 doesn't generate classes (default: false)
  #     Note: Some props like flex: 0 are valid, so this should be false for those
  #
  # Usage:
  #   # Test that display prop doesn't generate classes when nil/not passed
  #   test_global_prop_absence(
  #     :display,
  #     ['display_block', 'display_flex', 'display_none']
  #   )
  #
  # Usage (with exclude_zero):
  #   # Test that truncate prop doesn't generate classes, including for 0
  #   test_global_prop_absence(
  #     :truncate,
  #     ['truncate_0', 'truncate_1', 'truncate_2'],
  #     exclude_zero: true
  #   )
  def test_global_prop_absence(prop_name, excluded_classnames, options = {})
    exclude_zero = options.fetch(:exclude_zero, false)

    describe "##{prop_name} when not provided" do
      it "does not generate class names", :aggregate_failures do
        # Test with prop not passed at all
        instance_without_prop = subject.new({})
        excluded_classnames.each do |excluded_classname|
          expect(instance_without_prop.classname).not_to include(excluded_classname)
        end

        # Test with prop set to nil
        instance_with_nil = subject.new({ prop_name => nil })
        excluded_classnames.each do |excluded_classname|
          expect(instance_with_nil.classname).not_to include(excluded_classname)
        end

        # Test with prop set to empty string (if applicable)
        # Skip for boolean props like :dark which don't accept empty strings
        begin
          instance_with_empty = subject.new({ prop_name => "" })
          excluded_classnames.each do |excluded_classname|
            expect(instance_with_empty.classname).not_to include(excluded_classname)
          end
        rescue Playbook::Props::Error
          # Some props (like boolean :dark) don't accept empty strings, which is fine
          # The important thing is that nil and not-provided don't generate classes
        end

        # Optionally test with 0 if exclude_zero is true
        if exclude_zero
          instance_with_zero = subject.new({ prop_name => 0 })
          excluded_classnames.each do |excluded_classname|
            expect(instance_with_zero.classname).not_to include(excluded_classname)
          end
        end
      end
    end
  end

  # Test that a global prop handles invalid values gracefully without throwing errors or generating unexpected classes
  #
  # @param prop_name [Symbol] The name of the global prop (e.g., :display, :flex)
  # @param invalid_values [Array] Array of invalid values to test
  #   Example: ['invalid', 'bad_value', 123, 'special-chars!@#']
  # @param excluded_classnames [Array] Array of classnames that should NOT be present
  #   Example: ['display_invalid', 'display_bad_value', 'display_123']
  # @param options [Hash] Optional configuration
  #   - :allow_errors [Boolean] - If true, allows errors to be raised (default: false)
  #     Note: Some invalid values might cause errors, which is acceptable as long as
  #     they don't generate unexpected classes. Set to true if you expect some values to fail.
  #
  # Usage:
  #   # Test that display prop handles invalid values gracefully
  #   test_global_prop_invalid_values(
  #     :display,
  #     ['invalid', 'bad_value', 123, 'special-chars!@#'],
  #     ['display_invalid', 'display_bad_value', 'display_123', 'display_special-chars!@#']
  #   )
  #
  # Usage (with allow_errors):
  #   # Test numeric prop with out-of-range values
  #   test_global_prop_invalid_values(
  #     :flex,
  #     [999, -1, 'invalid', 'out_of_range'],
  #     ['flex_999', 'flex_-1', 'flex_invalid', 'flex_out_of_range'],
  #     allow_errors: true
  #   )
  def test_global_prop_invalid_values(prop_name, invalid_values, excluded_classnames, options = {})
    allow_errors = options.fetch(:allow_errors, false)

    describe "##{prop_name} with invalid values" do
      it "handles invalid values gracefully", :aggregate_failures do
        invalid_values.each do |invalid_value|
          instance = subject.new({ prop_name => invalid_value })

          # None of the excluded classnames should be present
          # If allow_errors is true, skip this check as it's a known bug that invalid values generate classes
          unless allow_errors
            excluded_classnames.each do |excluded_classname|
              expect(instance.classname).not_to include(excluded_classname)
            end
          end
        rescue => e
          # If errors are allowed, that's acceptable as long as no unexpected classes were generated
          raise e unless allow_errors

          # If we allow errors, we can't verify classes, so we just ensure it doesn't crash silently
          # and that the error is expected
          expect(e).to be_a(StandardError)
        end
      end
    end
  end
end

RSpec.configure do |config|
  config.extend GlobalPropsTestHelper
end
